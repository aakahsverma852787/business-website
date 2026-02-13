const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('./database');
const emailService = require('./emailService');
const authMiddleware = require('./auth');
const rateLimiter = require('./rateLimiter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve frontend files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API Routes

// Contact form submission
app.post('/api/contact', rateLimiter.contactForm, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Save to database
        const db = new Database();
        await db.connect();
        
        const contactId = await db.insertContact({
            name,
            email,
            phone: phone || null,
            service: service || 'General Inquiry',
            message,
            ip: req.ip,
            userAgent: req.get('user-agent')
        });

        // Send email notification
        try {
            await emailService.sendContactNotification({
                name,
                email,
                phone,
                service,
                message
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the request if email fails
        }

        await db.close();

        res.status(200).json({
            success: true,
            message: 'Thank you for contacting us! हम जल्द ही आपसे संपर्क करेंगे।',
            contactId
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
});

// Admin Login
app.post('/api/admin/login', rateLimiter.login, async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        const db = new Database();
        await db.connect();

        const user = await db.getAdminUser(username);
        
        if (!user) {
            await db.close();
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await authMiddleware.verifyPassword(password, user.password_hash);
        
        if (!isValidPassword) {
            await db.close();
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        await db.updateLastLogin(user.id);
        await db.close();

        // Generate token
        const token = authMiddleware.generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get all contacts (Admin only)
app.get('/api/admin/contacts', authMiddleware.authenticate, async (req, res) => {
    try {
        const { status, limit = 50, offset = 0, startDate, endDate } = req.query;

        const db = new Database();
        await db.connect();

        const filters = {
            status,
            limit: parseInt(limit),
            offset: parseInt(offset),
            startDate,
            endDate
        };

        const contacts = await db.getContacts(filters);
        const total = await db.getContactsCount(filters);

        await db.close();

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: (parseInt(offset) + contacts.length) < total
            }
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get single contact (Admin only)
app.get('/api/admin/contacts/:id', authMiddleware.authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const db = new Database();
        await db.connect();

        const contact = await db.getContactById(id);

        if (!contact) {
            await db.close();
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        // Mark as read
        await db.updateContactStatus(id, 'read');

        await db.close();

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Update contact status (Admin only)
app.patch('/api/admin/contacts/:id/status', authMiddleware.authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const db = new Database();
        await db.connect();

        await db.updateContactStatus(id, status);

        await db.close();

        res.json({
            success: true,
            message: 'Status updated successfully'
        });

    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Delete contact (Admin only)
app.delete('/api/admin/contacts/:id', authMiddleware.authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const db = new Database();
        await db.connect();

        await db.deleteContact(id);

        await db.close();

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Get dashboard stats (Admin only)
app.get('/api/admin/stats', authMiddleware.authenticate, async (req, res) => {
    try {
        const db = new Database();
        await db.connect();

        const stats = await db.getDashboardStats();

        await db.close();

        res.json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 Admin Panel: http://localhost:${PORT}/admin`);
    console.log(`⚡ API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
