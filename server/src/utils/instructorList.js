const sequelize = require('../db/sequelize');
const logger = require('./logger');
const Instructor = require('../models/instructor');

const instructorList = [];

async function loadInstructors() {
    if (instructorList.length === 0) {
        logger.info(`Begin to Retrieve All the Instructors' Name...`);
        let instructors = await Instructor.findAll({ attributes: [[sequelize.fn('DISTINCT', sequelize.col('name')), 'name']] });
        instructors.forEach(instructor => instructorList.push(instructor.name));
        logger.info(`Finished Retrieving All the Instructors' Name.`);
    }
    return instructorList;
}

module.exports = loadInstructors;
