import express from 'express';
import Fuse from 'fuse.js';
import NodeCache from 'node-cache';
import { QueryTypes } from 'sequelize';

import logger from '../utils/logger';
import sequelize from '../db/sequelize';

/**
 * A namespace storing a cache of a list of all instructors, intended to be used only in this file
 */
namespace CacheNamespace {
    let cache: NodeCache = new NodeCache();

    /**
     * Return a list of all instructors in the database -
     * if it is not in the cache, load it from the database and store it in the cache
     * @returns a promise containing every instructor's name
     */
    export async function loadInstructors(): Promise<string[]> {
        let instructorList: string[] = cache.get('instructors') ?? [];
        if (instructorList.length <= 0) {
            logger.info(`INFO: Begin to Retrieve All the Instructors' Name...`);
            let instructors: Array<{ name: string }> = await sequelize.query('SELECT DISTINCT name FROM Instructor', { type: QueryTypes.SELECT });
            instructors.forEach((instructor: { name: string }) => instructorList.push(instructor['name']));
            cache.set('instructors', instructorList);
            logger.info(`INFO: Finished Retrieving All the Instructors' Name.`);
        }
        return instructorList;
    }
}

/**
 * A controller for instructor fuzzy search
 * @param req user's request
 * @param res response to user's request
 * @param next the function that will be called if an exception is thrown
 */
export default async function(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
        let instructorList: string[] = await CacheNamespace.loadInstructors();
        let fuse: Fuse<string> = new Fuse(instructorList, { minMatchCharLength: 3 });
        let matches: string[] = fuse.search(req.query.name!.toString(), { limit: 5 }).map(match => match.item);
        res.json({ success: true, matches });
        logger.info('INFO: Received /instructors Data', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            data: matches
        });
    } catch (exception: any) {
        next(exception);
    }
}
