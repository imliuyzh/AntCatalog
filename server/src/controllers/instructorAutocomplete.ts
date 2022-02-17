import express from 'express';
import Fuse from 'fuse.js';
import NodeCache from 'node-cache';
import { QueryTypes } from 'sequelize';
import { Result, ValidationError, validationResult } from 'express-validator';

import logger from '../utils/logger';
import sequelize from '../db/sequelize';

const cache: NodeCache = new NodeCache();

/**
 * A controller for instructor fuzzy search.
 * @param req user's request
 * @param res response to user's request
 * @param next the function that will be called if an exception is thrown
 */
export default async function InstructorAutocompleteController(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
        let errors: Result<ValidationError> = validationResult(req);
        if (errors.isEmpty() === false) {
            let errMsg: ValidationError[] = errors.array();
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
            res
                .status(422)
                .json({
                    success: false,
                    info: errMsg
                });
            return;
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

/**
 * Return a list of all instructors in the database -
 * if it is not in the cache, load it from the database and store it in the cache
 * @returns a promise containing every instructor's name
 */
async function loadInstructors(): Promise<string[]> {
    let instructorList: string[] = cache.get('instructors') ?? [];
    if (instructorList.length <= 0) {
        logger.info(`Begin to Retrieve All the Instructors' Name...`);
        let instructors: Array<{ name: string }> = await sequelize.query('SELECT DISTINCT name FROM Instructor', { type: QueryTypes.SELECT });
        instructors.forEach((instructor: { name: string }) => instructorList.push(instructor['name']));
        cache.set('instructors', instructorList);
        logger.info(`Finished Retrieving All the Instructors' Name.`);
    }
    return instructorList;
}