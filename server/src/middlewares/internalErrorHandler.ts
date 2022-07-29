import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * An error handler when an exception is thrown within the server
 * @param err an error object for the specific exception thrown
 * @param req the client's request (it can also be any due to the need for mocking)
 * @param res data that will be sent to the client (it can also be any due to the need for mocking)
 * @param next the function that will be invoked after the processing work in this function
 */
function internalErrorHandler(err: Error, req: Request | any, res: Response | any, next: NextFunction): void {
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
