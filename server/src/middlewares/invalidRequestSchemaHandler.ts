import { NextFunction, Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import logger from '../utils/logger';

/**
 * An error handler when the request format does not match the expected
 * @param req the client's request (it can also be any due to the need for mocking)
 * @param res data that will be sent to the client (it can also be any due to the need for mocking)
 * @param next the function that will be invoked after the processing work in this function
 */
function invalidRequestSchemaHandler(req: Request, res: Response, next: NextFunction): void {
    let errors: Result<ValidationError> = validationResult(req);
    if (errors.isEmpty() === false) {
        let errMsg: ValidationError[] = errors.array();
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
        res
            .status(422)
            .json({
                success: false,
                info: errMsg
            });
        return;
    }
    next();
}

export default invalidRequestSchemaHandler;
