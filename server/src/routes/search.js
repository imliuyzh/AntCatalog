const express = require('express');
const { body, checkSchema, oneOf, validationResult } = require('express-validator');
const Sequelize = require('sequelize');

const logger = require('../utils/logger');
const sequelize = require('../db/sequelize');

let router = express.Router();

router.post(
    '/', 
    checkSchema({
        'values.term': {
            in: ['body'],
            optional: { 
                options: { nullable: true } 
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.department': {
            in: ['body'],
            optional: { 
                options: { nullable: true } 
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.courseNumber': {
            in: ['body'],
            optional: { 
                options: { nullable: true } 
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'values.courseCode': {
            in: ['body'],
            optional: { 
                options: { nullable: true } 
            },
            isInt: {
                bail: true,
                errorMessage: 'Value Must Be an Integer.'
            },
            toInt: true
        },
        'values.instructor': {
            in: ['body'],
            optional: { 
                options: { nullable: true } 
            },
            isString: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.'
            },
            trim: true,
            isLength: {
                bail: true,
                errorMessage: 'Value Must Be a Non-Empty String.',
                options: { min: 1 }
            }
        },
        'options.aggregate': {
            errorMessage: 'Value Must Be Boolean.',
            in: ['body'],
            isBoolean: true,
            toBoolean: true
        },
        'options.offset': {
            errorMessage: 'Value Must Be an Integer.',
            in: ['body'],
            isInt: {
                errorMessage: 'Value Must Not Be Negative.',
                options: { min: 0 }
            },
            toInt: true
        }
    }), 
    oneOf([
        body('values.term')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.department')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.courseNumber')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.'),
        body('values.courseCode')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isInt()
            .withMessage('Value Must Be an Integer.'),
        body('values.instructor')
            .exists()
            .withMessage('Malformed Request Syntax.')
            .bail()
            .isString()
            .withMessage('Value Must Be a String.')
            .bail()
            .trim()
            .notEmpty()
            .withMessage('Value Must Not Be Empty.')
    ]), 
    async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty() === false) {
            let errMsg = errors.array();
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(errMsg)}`)
            return res
                .status(400)
                .json({
                    success: false,
                    info: errMsg
                });
        }
        
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} Begin Retrieving Course Data...`);
        let courseList = (req.body.options.aggregate) ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(courseList)}`)
        res.json({ 
            success: true, 
            aggregate: req.body.options.aggregate,
            data: courseList
        });
    }
);

async function getAggregatedStatistics(req) {
    let aggregateQuery = null;
    if (req.body.values.instructor === null) {
        aggregateQuery = 
            `SELECT
                SUM(C.grade_a_count) AS gradeACount, 
                SUM(C.grade_b_count) AS gradeBCount, 
                SUM(C.grade_c_count) AS gradeCCount, 
                SUM(C.grade_d_count) AS gradeDCount, 
                SUM(C.grade_f_count) AS gradeFCount, 
                SUM(C.grade_p_count) AS gradePCount, 
                SUM(C.grade_np_count) AS gradeNpCount, 
                AVG(C.gpa_avg) AS gpaAvg
             FROM Course C
             WHERE 1 = 1`
    } else {
        aggregateQuery = 
            `SELECT
                SUM(C.grade_a_count) AS gradeACount, 
                SUM(C.grade_b_count) AS gradeBCount, 
                SUM(C.grade_c_count) AS gradeCCount, 
                SUM(C.grade_d_count) AS gradeDCount, 
                SUM(C.grade_f_count) AS gradeFCount, 
                SUM(C.grade_p_count) AS gradePCount, 
                SUM(C.grade_np_count) AS gradeNpCount, 
                AVG(C.gpa_avg) AS gpaAvg
             FROM Course C, Instructor I
             WHERE C.term = I.term AND C.course_code = I.course_code`;
    }
    
    let parameters = [];
    if (req.body.values.term !== null && req.body.values.term !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.term = ?`;
        parameters.push(req.body.values.term.toUpperCase());
    }
    if (req.body.values.department !== null && req.body.values.department !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.department = ?`;
        parameters.push(req.body.values.department.toUpperCase());
    }
    if (req.body.values.courseNumber !== null && req.body.values.courseNumber !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.course_number = ?`;
        parameters.push(req.body.values.courseNumber.toUpperCase());
    }
    if (req.body.values.courseCode !== null && req.body.values.courseCode !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.course_code = ?`;
        parameters.push(req.body.values.courseCode);
    }
    if (req.body.values.instructor !== null && req.body.values.instructor !== undefined) {
        aggregateQuery = `${aggregateQuery} AND I.name = ?`;
        parameters.push(req.body.values.instructor.toUpperCase());
    }
    
    let result = await sequelize.query(aggregateQuery, {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT 
    });
    
    return (result[0].gradeACount !== null && result[0].gradeBCount !== null && result[0].gradeCCount !== null && result[0].gradeDCount !== null && result[0].gradeFCount !== null && result[0].gradePCount !== null && result[0].gradeNpCount !== null && result[0].gpaAvg !== null) ? result : [];
}

async function getAssociatedCourses(req) {
    let tokens = [
        `SELECT
            C.term,
            C.course_code AS courseCode,
            C.department,
            C.course_number AS courseNumber,
            C.course_title AS courseTitle,
            I.name AS instructorName,
            C.grade_a_count AS gradeACount, 
            C.grade_b_count AS gradeBCount, 
            C.grade_c_count AS gradeCCount, 
            C.grade_d_count AS gradeDCount, 
            C.grade_f_count AS gradeFCount, 
            C.grade_p_count AS gradePCount, 
            C.grade_np_count AS gradeNpCount, 
            C.gpa_avg AS gpaAvg
         FROM Course C, Instructor I`,
        `WHERE C.term = I.term AND C.course_code = I.course_code`,
        `LIMIT 15 OFFSET ?`
    ];
        
    let parameters = [];
    if (req.body.values.term !== null && req.body.values.term !== undefined) {
        tokens[1] = `${tokens[1]} AND C.term = ?`;
        parameters.push(req.body.values.term.toUpperCase());
    }
    if (req.body.values.department !== null && req.body.values.department !== undefined) {
        tokens[1] = `${tokens[1]} AND C.department = ?`;
        parameters.push(req.body.values.department.toUpperCase());
    }
    if (req.body.values.courseNumber !== null && req.body.values.courseNumber !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_number = ?`;
        parameters.push(req.body.values.courseNumber.toUpperCase());
    }
    if (req.body.values.courseCode !== null && req.body.values.courseCode !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_code = ?`;
        parameters.push(req.body.values.courseCode);
    }
    if (req.body.values.instructor !== null && req.body.values.instructor !== undefined) {
        tokens[1] = `${tokens[1]} AND I.name = ?`;
        parameters.push(req.body.values.instructor.toUpperCase());
    }
    parameters.push(req.body.options.offset);
    
    let courses = await sequelize.query(tokens.join(' '), {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT 
    });

    let courseMap = new Map();
    courses.forEach(course => {
        if (courseMap.has(`${course.term} ${course.courseCode}`)) {
            let info = courseMap.get(`${course.term} ${course.courseCode}`);
            info.instructors.push(course.instructorName);
            courseMap.set(`${course.term} ${course.courseCode}`, info);
        } else {
            courseMap.set(`${course.term} ${course.courseCode}`, {
                term: course.term,
                courseCode: course.courseCode,
                department: course.department,
                courseNumber: course.courseNumber,
                courseTitle: course.courseTitle,
                instructors: [course.instructorName],
                gradeACount: course.gradeACount,
                gradeBCount: course.gradeBCount,
                gradeCCount: course.gradeCCount,
                gradeDCount: course.gradeDCount,
                gradeFCount: course.gradeFCount,
                gradePCount: course.gradePCount,
                gradeNpCount: course.gradeNpCount,
                gpaAvg: course.gpaAvg
            });
        }
    });
    return [...courseMap.values()];
}

module.exports = router;
