import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * An error handler for the case when an exception is thrown within the server.
 * @param err An object for the specific exception thrown.
 * @param req An object for user's request.
 * @param res An object for the response to user's request.
 * @param next The function that will be called if an exception is thrown.
 */
function internalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    logger.error('ERROR: Exception Thrown', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: JSON.stringify(req.body, null, 2),
        trace: err.stack
    });
    res
        .status(err.name === 'SyntaxError' ? 400 : 500)
        .json({
            success: false,
            info: err.name === 'SyntaxError' ? 'Please review your request body.' : 'Encountered an internal server error.'
        });
    next();
}

export default internalErrorHandler;
