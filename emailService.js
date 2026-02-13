const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = null;
        this.from = process.env.SMTP_FROM || 'noreply@yourbrand.com';
        this.adminEmail = process.env.ADMIN_EMAIL || 'admin@yourbrand.com';
    }

    async init() {
        // Create transporter
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Verify connection
        try {
            await this.transporter.verify();
            console.log('✅ Email service ready');
        } catch (error) {
            console.error('❌ Email service error:', error.message);
            console.log('ℹ️  Please configure SMTP settings in .env file');
        }
    }

    async sendContactNotification(data) {
        if (!this.transporter) {
            await this.init();
        }

        const { name, email, phone, service, message } = data;

        // Email to admin
        const adminMailOptions = {
            from: this.from,
            to: this.adminEmail,
            subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #d4af37; color: white; padding: 20px; text-align: center; }
                        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #555; }
                        .value { margin-top: 5px; }
                        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>नया संदेश प्राप्त हुआ!</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">Name:</div>
                                <div class="value">${name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value">${email}</div>
                            </div>
                            ${phone ? `
                            <div class="field">
                                <div class="label">Phone:</div>
                                <div class="value">${phone}</div>
                            </div>
                            ` : ''}
                            <div class="field">
                                <div class="label">Service:</div>
                                <div class="value">${service || 'General Inquiry'}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="value">${message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This is an automated message from your website contact form.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // Auto-reply to customer
        const customerMailOptions = {
            from: this.from,
            to: email,
            subject: 'Thank you for contacting us! - YourBrand',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #d4af37; color: white; padding: 30px; text-align: center; }
                        .content { padding: 30px; background: white; }
                        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding: 20px; }
                        .btn { background: #d4af37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>धन्यवाद, ${name}!</h1>
                        </div>
                        <div class="content">
                            <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
                            
                            <p><strong>Your message:</strong></p>
                            <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37;">
                                ${message}
                            </p>
                            
                            <p>We typically respond within 24 hours on business days.</p>
                            
                            <p>Best regards,<br>
                            <strong>YourBrand Team</strong></p>
                            
                            <a href="http://yourbrand.com" class="btn">Visit Our Website</a>
                        </div>
                        <div class="footer">
                            <p>© 2024 YourBrand. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        try {
            // Send both emails
            await Promise.all([
                this.transporter.sendMail(adminMailOptions),
                this.transporter.sendMail(customerMailOptions)
            ]);
            console.log('✅ Emails sent successfully');
        } catch (error) {
            console.error('❌ Email sending failed:', error.message);
            throw error;
        }
    }

    async sendWelcomeEmail(email, name) {
        if (!this.transporter) {
            await this.init();
        }

        const mailOptions = {
            from: this.from,
            to: email,
            subject: 'Welcome to YourBrand!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #d4af37; color: white; padding: 30px; text-align: center; }
                        .content { padding: 30px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to YourBrand!</h1>
                        </div>
                        <div class="content">
                            <p>Dear ${name},</p>
                            <p>Welcome to YourBrand! We're excited to have you on board.</p>
                            <p>Best regards,<br>YourBrand Team</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

// Create singleton instance
const emailService = new EmailService();
emailService.init().catch(console.error);

module.exports = emailService;
