const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

class AuthMiddleware {
    // Generate JWT token
    generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });
    }

    // Verify JWT token
    verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }

    // Hash password
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    // Verify password
    async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    // Authentication middleware
    authenticate(req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'No token provided'
                });
            }

            const token = authHeader.substring(7);
            const decoded = jwt.verify(token, JWT_SECRET);

            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }

            // Attach user info to request
            req.user = decoded;
            next();

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Authentication failed'
            });
        }
    }

    // Role-based authorization
    authorize(...roles) {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated'
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Insufficient permissions'
                });
            }

            next();
        };
    }
}

module.exports = new AuthMiddleware();
