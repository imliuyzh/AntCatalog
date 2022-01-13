const apicache = require('apicache');
const express = require('express');
const { body, checkSchema, oneOf, validationResult } = require('express-validator');

const { getAggregatedStatistics, getAssociatedCourses } = require('../utils/courseSearchAuxiliaries');
const logger = require('../utils/logger');

const cache = apicache
    .options({ appendKey: (req, _) => JSON.stringify(req.body) })
    .middleware;

let router = express.Router();
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
    cache('2 minutes', (_, res) => res.statusCode === 200),
    async (req, res, next) => {
        try {
            let err = validationResult(req);
            if (err.isEmpty() === false) {
                let errMsg = err.array();
                logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
                return res
                    .status(400)
                    .json({
                        success: false,
                        info: errMsg
                    });
            }
            
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} Begin Retrieving Course Data...`);
            let courseList = (req.body.options.aggregate) ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(courseList)}`);
            res.json({ 
                success: true, 
                aggregate: req.body.options.aggregate,
                data: courseList
            });
        } catch (exception) {
            next(exception);
        }
    }
);

module.exports = router;
