const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const Course = require('./course');

module.exports = sequelize.define('instructor', {
    term: {
        allowNull: false,
        primaryKey: true,
        references: {
            model: Course,
            key: 'term'
        },
        type: Sequelize.TEXT,
    },
    courseCode: {
        allowNull: false,
        field: 'course_code',
        primaryKey: true,
        references: {
            model: Course,
            key: 'courseCode'
        },
        type: Sequelize.INTEGER,
    },
    name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
    }
});
