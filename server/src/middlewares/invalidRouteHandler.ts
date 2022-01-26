import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

function invalidRouteHandler(req: Request, res: Response, next: NextFunction): void {
    logger.info(`${req.ip} ${req.method} ${req.originalUrl}`);
    res
        .status(404)
        .json({
            success: false,
            info: 'Link Not Found.'
        });
    next();
}

export default invalidRouteHandler;
