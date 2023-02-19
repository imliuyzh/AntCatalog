import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import logger from '../utils/logger';

/**
 * An error handler when the request format does not match the expected.
 * @param req An object for user's request.
 * @param res An object for the response to user's request.
 * @param next The function that will be invoked after the work is done.
 */
function invalidRequestSchemaHandler(req: Request, res: Response, next: NextFunction): void {
    let errors: Result<ValidationError> = validationResult(req);
    if (errors.isEmpty() === false) {
        let errMsg: ValidationError[] = errors.array();
        res
            .status(422)
            .json({
                success: false,
                info: errMsg
            });
        logger.info('ERROR: Invalid Request Schema', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            validatorErrors: errMsg
        });
        return;
    }
    next();
}

export default invalidRequestSchemaHandler;
