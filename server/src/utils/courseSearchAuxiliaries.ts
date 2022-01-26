import express from 'express';
import Sequelize from 'sequelize';
import sequelize from '../db/sequelize';

async function getAggregatedStatistics(req: express.Request): Promise<object> {
    let aggregateQuery: string = getAggregateQuery(req.body.values.instructor);

    let parameters: string[] = [];
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

    let result: any[] = await sequelize.query(aggregateQuery, {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT
    });

    return (result[0].gradeACount !== null
            && result[0].gradeBCount !== null
            && result[0].gradeCCount !== null
            && result[0].gradeDCount !== null
            && result[0].gradeFCount !== null
            && result[0].gradePCount !== null
            && result[0].gradeNpCount !== null
            && result[0].gpaAvg !== null)
        ? result
        : [];
}

function getAggregateQuery(instructor: string[]): string {
    return (instructor === null || instructor === undefined)
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
        : `SELECT
            SUM(C.grade_a_count) AS gradeACount, 
            SUM(C.grade_b_count) AS gradeBCount, 
            SUM(C.grade_c_count) AS gradeCCount, 
            SUM(C.grade_d_count) AS gradeDCount, 
            SUM(C.grade_f_count) AS gradeFCount, 
            SUM(C.grade_p_count) AS gradePCount, 
            SUM(C.grade_np_count) AS gradeNpCount, 
            AVG(C.gpa_avg) AS gpaAvg
          FROM
            Course C,
            Instructor I
          WHERE C.course_id = I.course_id`;
}

async function getAssociatedCourses(req: express.Request): Promise<object[]> {
    let results: object[] = await getAssociatedCourseList(req);
    results.forEach((course: any) => {
        course['instructors'] = course['instructors'].split(`/`);
    });
    return results;
}

async function getAssociatedCourseList(req: express.Request): Promise<object[]> {
    let tokens: string[] = [
        `SELECT
            C.term,
            C.course_code AS courseCode,
            C.department,
            C.course_number AS courseNumber,
            C.course_title AS courseTitle,
            IV.names AS instructors,
            C.grade_a_count AS gradeACount, 
            C.grade_b_count AS gradeBCount, 
            C.grade_c_count AS gradeCCount, 
            C.grade_d_count AS gradeDCount, 
            C.grade_f_count AS gradeFCount, 
            C.grade_p_count AS gradePCount, 
            C.grade_np_count AS gradeNpCount, 
            C.gpa_avg AS gpaAvg
         FROM
            Course C,
            InstructorView IV`,
        `WHERE C.course_id = IV.course_id`,
        `ORDER BY C.course_id ASC
         LIMIT 15 OFFSET :offset`
    ];
        
    let parameters: any = { offset: req.body.options.offset };
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
        tokens[0] = `${tokens[0]}, Instructor I`;
        tokens[1] = `${tokens[1]} AND C.course_id = I.course_id AND IV.course_id = I.course_id AND I.name = :instructor`;
        parameters.instructor = req.body.values.instructor.toUpperCase();
    }

    let courses: any[] = await sequelize.query(tokens.join(' '), {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT
    });

    return courses;
}

export { getAggregatedStatistics, getAssociatedCourses };
