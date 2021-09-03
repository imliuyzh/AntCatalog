const NodeCache = require('node-cache');
const { QueryTypes } = require('sequelize');

const sequelize = require('../db/sequelize');
const logger = require('./logger');

const cache = new NodeCache();

async function loadInstructors() {
    let instructorList = cache.get('instructors');
    if (instructorList === undefined) {
        instructorList = [];
        logger.info(`Begin to Retrieve All the Instructors' Name...`);
        let instructors = await sequelize.query('SELECT DISTINCT name FROM Instructor', { type: QueryTypes.SELECT });
        instructors.forEach(instructor => instructorList.push(instructor.name));
        cache.set('instructors', instructorList);
        logger.info(`Finished Retrieving All the Instructors' Name.`);
    }
    return instructorList;
}

module.exports = loadInstructors;
