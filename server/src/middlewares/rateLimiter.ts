import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const rateLimiter: RateLimitRequestHandler = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {
        success: false,
        info: 'Too Many Requests.'
    },
    standardHeaders: true,
    windowMs: 1000
});

export default rateLimiter;