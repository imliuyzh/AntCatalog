/**
 * @api {post} /courses Retrieve statistics for at most 15 courses based on the parameters given
 * @apiName CourseSearch
 * @apiGroup Search
 * 
 * @apiParam {Object} values A mandatory parameter object specifying the quarter, department, course number,
 * course code, and instructor of target classes.
 * @apiParam {Number[]} [values[year]]=[] Optional year field for the class (e.g. [2015, 2022]).
 * @apiParam {String[]} [values[quarter]]=[] Optional quarter field for the class (e.g. ["Fall", "Summer"]).
 * @apiParam {String[]} [values[department]]=[] Optional department field for the class (e.g. ["COMPSCI", "EDUC"]).
 * @apiParam {String[]} [values[courseNumber]]=[] Optional course number field for the class (e.g. ["161", "45J"]).
 * @apiParam {Number[]} [values[courseCode]]=[] Optional course code field for the class (e.g. [02250, 35780]).
 * @apiParam {String[]} [values[instructor]]=[] Optional instructor field for the class (e.g. ["KLEFSTAD, R.", "GOODRICH, M."]).
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
 *                 "value": ["2021"],
 *                 "msg": "It must be an array of positive integers starting from 2013 to 2022.",
 *                 "param": "values.year",
 *                 "location": "body"
 *             },
 *             {
 *                 "value": [247],
 *                 "msg": "It must be an array of non-empty strings.",
 *                 "param": "values.courseNumber",
 *                 "location": "body"
 *             }
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
import { body, ValidationChain } from 'express-validator';
import express from 'express';

import CourseController from '../controllers/courseController';
import invalidRequestSchemaHandler from '../middlewares/invalidRequestSchemaHandler';

const cache = apicache
    .options({ appendKey: (req: express.Request, _: unknown) => JSON.stringify(req.body) })
    .middleware;
const cacheWorker = cache('60 seconds', (_: unknown, res: express.Response) => res.statusCode === 200);
const validators: ValidationChain[] = [
    body('values.year')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of integers.'),
    body('values.year[*]')
        .toInt()
        .isInt({
            min: 2013,
            max: 2022
        })
        .bail()
        .withMessage('It must be a positive integer starting from 2013 to 2022.'),
    body('values.quarter')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.quarter[*]')
        .isString()
        .bail()
        .withMessage('It must be a non-empty string.')
        .trim()
        .notEmpty()
        .bail()
        .withMessage('It must be a non-empty string.')
        .custom((quarter: String) => ['FALL', 'WINTER', 'SPRING', 'SUMMER'].includes(quarter.toUpperCase()))
        .bail()
        .withMessage('Fall, Winter, Spring, and Summer quarters only.')
        .customSanitizer((qtr: string) => qtr[0].toUpperCase() + qtr.slice(1, qtr.length).toLowerCase()),
    body('values.department')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.department[*]')
        .isString()
        .bail()
        .withMessage('It must be a non-empty string.')
        .trim()
        .notEmpty()
        .bail()
        .withMessage('It must be a non-empty string.')
        .toUpperCase(),
    body('values.courseNumber')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.courseNumber[*]')
        .isString()
        .bail()
        .withMessage('It must be a non-empty string.')
        .trim()
        .notEmpty()
        .bail()
        .withMessage('It must be a non-empty string.')
        .toUpperCase(),
    body('values.courseCode')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of positive 5-digit integers.'),
    body('values.courseCode[*]')
        .toInt()
        .isInt({
            allow_leading_zeroes: true,
            max: 99999
        })
        .bail()
        .withMessage('It must be a positive 5-digit integer.'),
    body('values.instructor')
        .default([])
        .isArray()
        .bail()
        .withMessage('It must be an array of non-empty strings.'),
    body('values.instructor[*]')
        .isString()
        .bail()
        .withMessage('It must be a non-empty string.')
        .trim()
        .notEmpty()
        .bail()
        .withMessage('It must be a non-empty string.')
        .toUpperCase(),
    body('options.aggregate')
        .exists()
        .bail()
        .withMessage('It is a mandatory field.')
        .isBoolean()
        .bail()
        .withMessage('It must be a boolean.'),
    body('options.offset')
        .default(0)
        .isInt({
            allow_leading_zeroes: true,
            min: 0
        })
        .bail()
        .withMessage('It must be an integer starting from 0.')
];

export default express
    .Router()
    .post('/', [validators, invalidRequestSchemaHandler, cacheWorker], CourseController);
