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
 * @apiError BrokenRequestError An exception is raised when parsing the request body.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "success": false,
 *         "info": "Please review your request body."
 *     }
 * 
 * @apiError InvalidSchema The parameter name does not match the expectation.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *         "success": false,
 *         "info": [{
 *             "type": "field",
 *             "msg": "\"name\" is required.",
 *             "path": "name",
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
import { query, ValidationChain } from 'express-validator';

import instructorController from '../controllers/instructorController';
import invalidRequestSchemaHandler from '../middlewares/invalidRequestSchemaHandler';

const cacheWorker = apicache.middleware('30 seconds', (_: unknown, res: express.Response) => res.statusCode === 200);
const validateRequest: () => ValidationChain = () =>
    query('name')
        .exists()
        .bail()
        .withMessage(`"name" is required.`)
        .isString()
        .bail()
        .withMessage(`"name" must be a string.`)
        .trim()
        .isLength({
            min: 2,
            max: 20
        })
        .bail()
        .withMessage(`"name" must have 2 to 20 characters.`);

export default express
    .Router()
    .get('/', [validateRequest(), invalidRequestSchemaHandler, cacheWorker], instructorController);
