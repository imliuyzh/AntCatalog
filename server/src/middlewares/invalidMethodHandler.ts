import { Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * An error handler for the case when the user is trying to access
 * an existing endpoint with the wrong HTTP method.
 * @param req An object for user's request.
 * @param res An object for the response to user's request.
 */
function invalidMethodHandler(req: Request, res: Response): void {
    res
        .status(405)
        .json({
            success: false,
            info: 'Method not allowed.'
        });
    logger.info('ERROR: Method Not Allowed', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    });
}

export default invalidMethodHandler;
