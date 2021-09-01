const { QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const logger = require('./logger');

const instructorList = [];

async function loadInstructors() {
    if (instructorList.length === 0) {
        logger.info(`Begin to Retrieve All the Instructors' Name...`);
        let instructors = await sequelize.query('SELECT DISTINCT name FROM Instructor', { type: QueryTypes.SELECT });
        instructors.forEach(instructor => instructorList.push(instructor.name));
        logger.info(`Finished Retrieving All the Instructors' Name.`);
    }
    return instructorList;
}

module.exports = loadInstructors;
