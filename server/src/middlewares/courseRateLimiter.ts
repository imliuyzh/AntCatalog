import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

/**
 * Restricts 5 requests maximum per second from the same client
 */
const courseRateLimiter: RateLimitRequestHandler = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {
        success: false,
        info: 'Too Many Requests.'
    },
    standardHeaders: true,
    windowMs: 1000
});

export default courseRateLimiter;