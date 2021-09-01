const logger = require('./logger');

function internalErrorHandler(err, req, res, next) {
    logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} ${err.stack}`);
    res
        .status(500)
        .json({
            success: false,
            info: 'Encountered an Internal Server-Side Error.'
        });
    next();
}

module.exports = internalErrorHandler;
