const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
    legacyHeaders: false,
    max: 5,
    message: {
        success: false,
        info: 'Too Many Requests.'
    },
    standardHeaders: true,
    windowMs: 1000
});
