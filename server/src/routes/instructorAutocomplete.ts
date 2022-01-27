import apicache from 'apicache';
import express from 'express';
import Fuse from 'fuse.js';
import { query, Result, ValidationError, validationResult } from 'express-validator';

import loadInstructors from '../utils/instructorList';
import logger from '../utils/logger';

const cache = apicache.middleware;

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

const cacheWorker = cache('30 seconds', (_: unknown, res: express.Response) => res.statusCode === 200);

let router: express.Router = express.Router();

router.get(
    '/',
    [validatorPreparer, validator, cacheWorker],
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let errors: Result<ValidationError> = validationResult(req);
            if (errors.isEmpty() === false) {
                let errMsg: ValidationError[] = errors.array();
                logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
                return res
                    .status(422)
                    .json({
                        success: false,
                        info: errMsg
                    });
            }

            let instructorList: string[] = await loadInstructors();
            let fuse: Fuse<string> = new Fuse(instructorList, { minMatchCharLength: 3 });
            let matches: string[] = (req.query.name !== undefined) ? fuse.search(req.query.name.toString(), { limit: 5 }).map(match => match.item) : [];
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(matches)}`);
            res.json({ success: true, matches });
        } catch (exception: any) {
            next(exception);
        }
    }
);

export default router;
