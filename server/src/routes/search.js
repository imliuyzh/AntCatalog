const express = require('express');
const { body, checkSchema, oneOf, validationResult } = require('express-validator');
const logger = require('../utils/logger');

let router = express.Router();

router.post(
    '/',
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
            isInt: true,
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
    (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty() === false) {
            let errMsg = errors.array();
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`)
            return res
                .status(400)
                .json({
                    success: false,
                    info: errMsg
                });
        }
    
        res.json({ success: true });
    }
);

module.exports = router;
