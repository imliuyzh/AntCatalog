const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    keyGenerator: (req, _) => JSON.stringify(req.body),
    message: {
        success: false,
        info: 'Too Many Requests.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    windowMs: 1000,
});
