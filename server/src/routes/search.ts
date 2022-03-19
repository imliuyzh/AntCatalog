/**
 * @api {post} /api/search Retrieve statistics for at most 15 courses based on the parameters given
 * @apiName SearchCourses
 * @apiGroup Search
 * 
 * @apiParam {Object} values A mandatory parameter object specifying the quarter, department, course number,
 * course code, and instructor of target classes. One of these fields must be non-empty.
 * @apiParam {Number} [values[year]] Optional year field for the class (e.g. 2021, 2015).
 * @apiParam {String} [values[quarter]] Optional quarter field for the class (e.g. "Spring", "Fall").
 * @apiParam {String} [values[department]] Optional department field for the class (e.g. "COMPSCI", "EDUC").
 * @apiParam {String} [values[courseNumber]] Optional course number field for the class (e.g. "161", "45J").
 * @apiParam {Number} [values[courseCode]] Optional course code field for the class (e.g. 02250, 35780).
 * @apiParam {String} [values[instructor]] Optional instructor field for the class (e.g. "KLEFSTAD, R.", "GOODRICH, M.").
 * 
 * @apiParam {Object} options A mandatory parameter object specifying the way data is going to be fetched.
 * @apiParam {Boolean} options[aggregate] A mandatory field specifying if data should be merged.
 * @apiParam {Number} options[offset]=0 A mandatory field specifying the range of data, usually used for pagination purposes.
 * 
 * @apiSuccess {Boolean} success A flag set to true if suggestions are successfully computed.
 * @apiSuccess {Boolean} aggregate A flag set to true if the statistics need to be combined.
 * @apiSuccess {Object[]} data Course statistics which matched the parameters given.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "success": true,
 *         "aggregate": false,
 *         "data": [{
 *             "year": 2021,
 *             "quarter": "Fall"
 *             "courseCode": 35220,
 *             "department": "COMPSCI",
 *             "courseNumber": "220P",
 *             "courseTitle": "DATABAS & DATA MGMT",
 *             "instructors": ["LI, C."],
 *             "gradeACount": 36,
 *             "gradeBCount": 30,
 *             "gradeCCount": 0,
 *             "gradeDCount": 0,
 *             "gradeFCount": 2,
 *             "gradePCount": 0,
 *             "gradeNpCount": 0,
 *             "gpaAvg": 3.41
 *         }]
 *     }
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "success": true,
 *         "aggregate": true,
 *         "data": [{
 *             "gradeACount": 159,
 *             "gradeBCount": 60,
 *             "gradeCCount": 0,
 *             "gradeDCount": 0,
 *             "gradeFCount": 0,
 *             "gradePCount": 0,
 *             "gradeNpCount": 0,
 *             "gpaAvg": 3.7800000000000002
 *         }]
 *     }
 * 
 * @apiError InvalidSchema The parameters do not match the expectation.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "success": false,
 *         "info": [
 *             {
 *                 "msg": "Invalid value(s)",
 *                 "param": "_error",
 *                 "nestedErrors": [
 *                     {
 *                         "value": null,
 *                         "msg": "Value Must Be a String.",
 *                         "param": "values.term",
 *                         "location": "body"
 *                     },
 *                     ...
 *                 ]
 *             },
 *             ...
 *         ]
 *     }
 * 
 * @apiError InternalError An exception is raised inside the server application.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *         "success": false,
 *         "info": "Encountered an Internal Server-Side Error."
 *     }
 */

import apicache from 'apicache';
import { body, checkSchema, oneOf } from 'express-validator';
import express from 'express';
import SearchController from '../controllers/search';

const cache = apicache
    .options({ appendKey: (req: express.Request, _: unknown) => JSON.stringify(req.body) })
    .middleware;
const validatorPreparer = body('options.offset').default(0);
const schemaChecker = checkSchema({
    'values.year': {
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
    'values.quarter': {
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
            errorMessage: `Value Must Be Either "Fall," "Winter," or "Spring."`,
            options: { min: 3 }
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
});
const validator = oneOf([
    body('values.year')
        .exists()
        .withMessage('Malformed Request Syntax.')
        .bail()
        .isInt()
        .withMessage('Value Must Be an Integer.'),
    body('values.quarter')
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
]);
const cacheWorker = cache('2 minutes', (_: unknown, res: express.Response) => res.statusCode === 200);

export default express
    .Router()
    .post('/', [validatorPreparer, schemaChecker, validator, cacheWorker], SearchController);
