const logger = require('../utils/logger');

function invalidRouteHandler(req, res, next) {
    logger.info(`${req.ip} ${req.method} ${req.originalUrl}`);
    res
        .status(404)
        .json({
            success: false,
            info: 'Link Not Found.'
        });
    next();
}

module.exports = invalidRouteHandler;
