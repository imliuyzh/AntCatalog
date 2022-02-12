import NodeCache from 'node-cache';
import { QueryTypes } from 'sequelize';

import logger from './logger';
import sequelize from '../db/sequelize';

const cache: NodeCache = new NodeCache();

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

export default loadInstructors;
