import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

/**
 * A handler to handle the case when the user is trying to access an invalid endpoint/URL
 * @param req the client's request
 * @param res data that will be sent to the client
 * @param next the function that will be invoked after the processing work in this function
 */
function invalidRouteHandler(req: Request, res: Response, next: NextFunction): void {
    logger.info('ERROR: Link Not Found', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
    });
    res
        .status(404)
        .json({
            success: false,
            info: 'Link Not Found.'
        });
    next();
}

export default invalidRouteHandler;
