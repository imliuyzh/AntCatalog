import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * An error handler when an exception is thrown within the server
 * @param err an error object for the specific exception thrown
 * @param req the client's request (it can also be any due to the need for mocking)
 * @param res data that will be sent to the client (it can also be any due to the need for mocking)
 * @param next the function that will be invoked after the processing work in this function
 */
function internalErrorHandler(
    err: Error,
    req: Request | any,
    res: Response | any,
    next: NextFunction,
): void {
    logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} ${err.stack}`);
    res
        .status(500)
        .json({
            success: false,
            info: 'Encountered an Internal Server-Side Error.',
        });
    next();
}

export default internalErrorHandler;
