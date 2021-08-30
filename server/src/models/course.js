const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

module.exports = sequelize.define('course', {
    term: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
    },
    courseCode: {
        allowNull: false,
        field: 'course_code',
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    department: {
        allowNull: false,
        type: Sequelize.TEXT,
    },
    courseNumber: {
        allowNull: false,
        field: 'course_number',
        type: Sequelize.TEXT,
    },
    courseTitle: {
        allowNull: false,
        field: 'course_title',
        type: Sequelize.TEXT,
    },
    gradeACount: {
        allowNull: false,
        field: 'grade_a_count',
        type: Sequelize.INTEGER,
    },
    gradeBCount: {
        allowNull: false,
        field: 'grade_b_count',
        type: Sequelize.INTEGER,
    },
    gradeCCount: {
        allowNull: false,
        field: 'grade_c_count',
        type: Sequelize.INTEGER,
    },
    gradeDCount: {
        allowNull: false,
        field: 'grade_d_count',
        type: Sequelize.INTEGER,
    },
    gradeFCount: {
        allowNull: false,
        field: 'grade_f_count',
        type: Sequelize.INTEGER,
    },
    gradePCount: {
        allowNull: false,
        field: 'grade_p_count',
        type: Sequelize.INTEGER,
    },
    gradeNpCount: {
        allowNull: false,
        field: 'grade_np_count',
        type: Sequelize.INTEGER,
    },
    gpaAvg: {
        allowNull: false,
        field: 'gpa_avg',
        type: Sequelize.REAL,
    }
});
