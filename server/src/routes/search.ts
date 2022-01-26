import apicache from 'apicache';
import express from 'express';
import { body, checkSchema, oneOf, Result, ValidationError, validationResult } from 'express-validator';

import { getAggregatedStatistics, getAssociatedCourses } from '../utils/courseSearchAuxiliaries';
import logger from '../utils/logger';

const cache: any = apicache
    .options({ appendKey: (req: express.Request, _: unknown) => JSON.stringify(req.body) })
    .middleware;

let router: express.Router = express.Router();
router.post(
    '/',
    body('options.offset').default('0'),
    checkSchema({
        'values.term': {
            in: ['body'],
            optional: {
                options: { nullable: true }
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.department': {
            in: ['body'],
            optional: {
                options: { nullable: true }
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.courseNumber': {
            in: ['body'],
            optional: {
                options: { nullable: true }
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.courseCode': {
            in: ['body'],
            optional: {
                options: { nullable: true }
            },
            isInt: {
                bail: true,
                errorMessage: 'Value Must Be an Integer.'
            },
            toInt: true
        },
        'values.instructor': {
            in: ['body'],
            optional: {
                options: { nullable: true }
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'options.aggregate': {
            errorMessage: 'Value Must Be Boolean.',
            in: ['body'],
            isBoolean: true,
            toBoolean: true
        },
        'options.offset': {
            errorMessage: 'Value Must Be an Integer.',
            in: ['body'],
            isInt: {
                errorMessage: 'Value Must Not Be Negative.',
                options: { min: 0 }
            },
            toInt: true
        }
    }),
    oneOf([
        body('values.term')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.department')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.courseNumber')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.courseCode')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isInt()
            .withMessage('Value Must Be an Integer.'),
        body('values.instructor')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.')
    ]),
    cache('2 minutes', (_: unknown, res: express.Response) => res.statusCode === 200),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let err: Result<ValidationError> = validationResult(req);
            if (err.isEmpty() === false) {
                let errMsg: ValidationError[] = err.array();
                logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
                return res
                    .status(422)
                    .json({
                        success: false,
                        info: errMsg
                    });
            }

            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} Begin Retrieving Course Data...`);
            let courseList: object | object[] = (req.body.options.aggregate) ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(courseList)}`);
            res.json({ 
                success: true,
                aggregate: req.body.options.aggregate,
                data: courseList
            });
        } catch (exception: any) {
            next(exception);
        }
    }
);

export default router;
