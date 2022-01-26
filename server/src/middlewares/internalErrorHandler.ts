import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

function internalErrorHandler(err: Error, req: Request | any, res: Response | any, next: NextFunction): void {
    logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.query)} ${JSON.stringify(req.body)} ${err.stack}`);
    res
        .status(500)
        .json({
            success: false,
            info: 'Encountered an Internal Server-Side Error.'
        });
    next();
}

export default internalErrorHandler;
