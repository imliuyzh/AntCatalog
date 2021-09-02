const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 500,
    max: 1,
    message: {
        success: false,
        info: 'Too Many Requests Received.'
    }
});
