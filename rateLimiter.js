const rateLimit = require('express-rate-limit');

// General API rate limiter
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Contact form rate limiter (stricter)
const contactFormLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 submissions per hour
    message: {
        success: false,
        message: 'Too many contact form submissions. Please try again after an hour.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false
});

// Login rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 login attempts
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Don't count successful logins
});

// Admin actions rate limiter
const adminLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 requests per minute
    message: {
        success: false,
        message: 'Too many requests. Please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    general: generalLimiter,
    contactForm: contactFormLimiter,
    login: loginLimiter,
    admin: adminLimiter
};
