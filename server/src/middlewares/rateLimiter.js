const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 1000,
    max: 2,
    message: {
        success: false,
        info: 'Too Many Requests Received.'
    }
});
