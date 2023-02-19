import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Limit 5 requests maximum per second for a client.
 */
const courseRateLimiter: RateLimitRequestHandler = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {
        success: false,
        info: 'Too many requests.'
    },
    standardHeaders: true,
    windowMs: 1000
});

export default courseRateLimiter;