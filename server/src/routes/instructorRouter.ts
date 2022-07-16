/**
 * @api {get} /instructors Suggest instructors with similar names through fuzzy search
 * @apiName InstructorSearch
 * @apiGroup Search
 * 
 * @apiParam {String} name A token used as the basis for the matching process
 * 
 * @apiSuccess {Boolean} success A flag set to true if suggestions are successfully computed.
 * @apiSuccess {String[]} matches Similar instructor names (at most 5) computed based on the name parameter.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "success": true,
 *         "matches": ["BURTSEV, A.", "BARTELL, S.", "BARTLETT, J.", "BURGE, K.", "BURKE, C."]
 *     }
 * 
 * @apiError InvalidSchema The parameter name does not match the expectation.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "success": false,
 *         "info": [{
 *             "value": "",
 *             "msg": "Value must not be empty.",
 *             "param": "name",
 *             "location": "query"
 *         }]
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
import express from 'express';
import { query } from 'express-validator';

import InstructorController from '../controllers/instructorController';
import invalidRequestSchemaHandler from '../middlewares/invalidRequestSchemaHandler';

const cacheWorker = apicache.middleware('30 seconds', (_: unknown, res: express.Response) => res.statusCode === 200);
const validatorPreparer = query('name').default('');
const validator = query('name')
    .exists()
    .bail()
    .withMessage('The name parameter is required in the query string.')
    .isString()
    .bail()
    .withMessage('Value must be a string.')
    .trim()
    .notEmpty()
    .bail()
    .withMessage('Value must not be empty.');

export default express
    .Router()
    .get('/', [validatorPreparer, validator, invalidRequestSchemaHandler, cacheWorker], InstructorController);
