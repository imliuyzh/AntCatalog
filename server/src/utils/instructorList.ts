import NodeCache from 'node-cache';
import { QueryTypes } from 'sequelize';

import sequelize from '../db/sequelize';
import logger from './logger';

const cache: NodeCache = new NodeCache();

async function loadInstructors(): Promise<string[]> {
    let instructorList: string[] | any = cache.get('instructors');
    if (instructorList === undefined) {
        instructorList = [];
        logger.info(`Begin to Retrieve All the Instructors' Name...`);
        let instructors: any[] = await sequelize.query('SELECT DISTINCT name FROM Instructor', { type: QueryTypes.SELECT });
        instructors.forEach(instructor => instructorList.push(instructor.name));
        cache.set('instructors', instructorList);
        logger.info(`Finished Retrieving All the Instructors' Name.`);
    }
    return instructorList;
}

export default loadInstructors;
