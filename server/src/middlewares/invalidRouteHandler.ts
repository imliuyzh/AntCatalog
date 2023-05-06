import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * A handler to handle the case when the user is trying to access an invalid endpoint.
 * @param req An object for user's request.
 * @param res An object for the response to user's request.
 * @param next The function that will be invoked after the work is done.
 */
function invalidRouteHandler(req: Request, res: Response, next: NextFunction): void {
    res
        .status(404)
        .json({
            success: false,
            info: 'Link not found.'
        });
    logger.info('ERROR: Link Not Found', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    });
    next();
}

export default invalidRouteHandler;
