/**
 * @api {get} /complete/instructors Suggest instructors with similar names through fuzzy search
 * @apiName GetInstructorSuggestions
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
 *             "msg": "Value Must Not Be Empty.",
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
 *         "info": "Encountered an Internal Server-Side Error."
 *     }
 */

import apicache from 'apicache';
import express from 'express';
import InstructorAutocompleteController from '../controllers/instructorAutocomplete';
import { query } from 'express-validator';

const cacheWorker = apicache.middleware('30 seconds', (_: unknown, res: express.Response) => res.statusCode === 200);
const validatorPreparer = query('name').default('');
const validator = query('name')
    .exists()
    .withMessage('Malformed Request Syntax.')
    .bail()
    .isString()
    .withMessage('Value Must Be a String.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Value Must Not Be Empty.');


export default express
    .Router()
    .get('/', [validatorPreparer, validator, cacheWorker], InstructorAutocompleteController);
