const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const logger = require('./logger');

async function getAggregatedStatistics(req) {
    let aggregateQuery = getAggregateQuery(req.body.values.instructor);
    
    let parameters = [];
    if (req.body.values.term !== null && req.body.values.term !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.term = ?`;
        parameters.push(req.body.values.term);
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

function getAggregateQuery(instructor) {
    return (instructor === null)
        ? `SELECT
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
        :`SELECT
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

async function getAssociatedCourses(req) {
    let courses = await getAssociatedCourseList(req);
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

async function getAssociatedCourseList(req) {
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
        `LIMIT 15 OFFSET :offset`
    ];
        
    let parameters = {};
    if (req.body.values.term !== null && req.body.values.term !== undefined) {
        tokens[1] = `${tokens[1]} AND C.term = :term`;
        parameters.term = req.body.values.term;
    }
    if (req.body.values.department !== null && req.body.values.department !== undefined) {
        tokens[1] = `${tokens[1]} AND C.department = :department`;
        parameters.department = req.body.values.department.toUpperCase();
    }
    if (req.body.values.courseNumber !== null && req.body.values.courseNumber !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_number = :courseNumber`;
        parameters.courseNumber = req.body.values.courseNumber.toUpperCase();
    }
    if (req.body.values.courseCode !== null && req.body.values.courseCode !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_code = :courseCode`;
        parameters.courseCode = req.body.values.courseCode;
    }
    if (req.body.values.instructor !== null && req.body.values.instructor !== undefined) {
        tokens[0] = `WITH A AS (SELECT (AC.term || " " || AC.course_code) FROM Course AC, Instructor AI WHERE AC.term = AI.term AND AC.course_code = AI.course_code AND AI.name = :instructor) ${tokens[0]}`
        tokens[1] = `${tokens[1]} AND (C.term || " " || C.course_code) IN A`;
        parameters.instructor = req.body.values.instructor.toUpperCase();
    }
    parameters.offset = req.body.options.offset;
    
    logger.warn(tokens.join(' '));
    
    let courses = await sequelize.query(tokens.join(' '), {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT 
    });
    
    return courses;
}

module.exports = {
    getAggregatedStatistics,
    getAssociatedCourses
};
