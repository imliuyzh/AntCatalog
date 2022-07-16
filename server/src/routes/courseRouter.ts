/**
 * @api {post} /courses Retrieve statistics for at most 15 courses based on the parameters given
 * @apiName CourseSearch
 * @apiGroup Search
 * 
 * @apiParam {Object} values A mandatory parameter object specifying the quarter, department, course number,
 * course code, and instructor of target classes.
 * @apiParam {Number[]} [values[year]] Optional year field for the class (e.g. [2015, 2022]).
 * @apiParam {String[]} [values[quarter]] Optional quarter field for the class (e.g. ["Fall", "Summer"]).
 * @apiParam {String[]} [values[department]] Optional department field for the class (e.g. ["COMPSCI", "EDUC"]).
 * @apiParam {String[]} [values[courseNumber]] Optional course number field for the class (e.g. ["161", "45J"]).
 * @apiParam {Number[]} [values[courseCode]] Optional course code field for the class (e.g. [02250, 35780]).
 * @apiParam {String[]} [values[instructor]] Optional instructor field for the class (e.g. ["KLEFSTAD, R.", "GOODRICH, M."]).
 * 
 * @apiParam {Object} options A mandatory parameter object specifying the way data is going to be fetched.
 * @apiParam {Boolean} options[aggregate] A mandatory field specifying if data should be merged.
 * @apiParam {Number} options[offset]=0 A field for specifying the range of data, usually used for pagination purposes.
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
 *                         "msg": "Value must be a string.",
 *                         "param": "values.quarter",
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
 *         "info": "Encountered an internal server error."
 *     }
 */

import apicache from 'apicache';
import { body, checkSchema, ValidationChain } from 'express-validator';
import express from 'express';

import CourseController from '../controllers/courseController';
import invalidRequestSchemaHandler from '../middlewares/invalidRequestSchemaHandler';

const cache = apicache
    .options({ appendKey: (req: express.Request, _: unknown) => JSON.stringify(req.body) })
    .middleware;
const cacheWorker = cache('2 minutes', (_: unknown, res: express.Response) => res.statusCode === 200);
const offsetPreparer: ValidationChain = body('options.offset').default(0);
const schemaChecker = checkSchema({
    'values.year': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'values.quarter': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'values.department': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'values.courseNumber': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'values.courseCode': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'values.instructor': {
        in: ['body'],
        optional: {
            options: { nullable: true }
        }
    },
    'options.aggregate': {
        errorMessage: 'It must be a boolean.',
        in: ['body'],
        isBoolean: true,
        toBoolean: true
    },
    'options.offset': {
        errorMessage: 'It must be an integer.',
        in: ['body'],
        isInt: {
            errorMessage: 'It must not be negative.',
            options: { min: 0 }
        },
        toInt: true
    }
});
const validators: ValidationChain[] = [
    body('values.year')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of integers.')
        .custom((years: Number[]) => years.every((year: Number) => Number.isSafeInteger(year) && year >= 2013 && year <= 2022))
        .bail()
        .withMessage('It must be an array of positive integers starting from 2013 to 2022.'),
    body('values.quarter')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.')
        .custom((quarters: String[]) => quarters.every((quarter: String) =>
            (typeof quarter === 'string' || quarter instanceof String) && ['FALL', 'WINTER', 'SPRING', 'SUMMER'].includes(quarter.trim().toUpperCase())
        ))
        .bail()
        .withMessage('Fall, Winter, Spring, and Summer quarters only.'),
    body('values.department')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.')
        .custom((departments: String[]) => departments.every((department: String) =>
            (typeof department === 'string' || department instanceof String) && department.trim().length > 0
        ))
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.courseNumber')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.')
        .custom((courseNumbers: String[]) => courseNumbers.every((courseNumber: String) =>
            (typeof courseNumber === 'string' || courseNumber instanceof String) && courseNumber.toString().trim().length > 0
        ))
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.courseCode')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of positive 5-digit integers.')
        .custom((courseCodes: Number[]) => courseCodes.every((courseCode: Number) => Number.isSafeInteger(courseCode) && courseCode.toString().trim().length > 0))
        .bail()
        .withMessage('It must be an array of positive 5-digit integers.'),
    body('values.instructor')
        .optional({ nullable: true })
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.')
        .custom((instructors: String[]) => instructors.every((instructor: String) =>
            (typeof instructor === 'string' || instructor instanceof String) && instructor.trim().length > 0
        ))
        .bail()
        .withMessage('It must be an array of non-empty strings.')
];

export default express
    .Router()
    .post('/', [offsetPreparer, schemaChecker, validators, invalidRequestSchemaHandler, cacheWorker], CourseController);
