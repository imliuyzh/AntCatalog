import express from 'express';
import Sequelize from 'sequelize';

import logger from '../utils/logger';
import sequelize from '../db/sequelize';

type RawAggregateCourseData = {
    gradeACount: number,
    gradeBCount: number,
    gradeCCount: number,
    gradeDCount: number,
    gradeFCount: number,
    gradePCount: number,
    gradeNpCount: number,
    gpaAvg: number
};

type RawCourseData = {
    year: number,
    quarter: string,
    courseCode: number,
    department: string,
    courseNumber: string,
    courseTitle: string,
    instructors: string,
    gradeACount: number,
    gradeBCount: number,
    gradeCCount: number,
    gradeDCount: number,
    gradeFCount: number,
    gradePCount: number,
    gradeNpCount: number,
    gpaAvg: number
};

type ProcessedCourseData = {
    year: number,
    quarter: string,
    courseCode: number,
    department: string,
    courseNumber: string,
    courseTitle: string,
    instructors: string[],
    gradeACount: number,
    gradeBCount: number,
    gradeCCount: number,
    gradeDCount: number,
    gradeFCount: number,
    gradePCount: number,
    gradeNpCount: number,
    gpaAvg: number
};

type CourseDataQueryParameters = {
    year?: number,
    quarter?: string,
    courseCode?: number,
    department?: string,
    courseNumber?: string,
    instructor?: string,
    offset: number
};

/**
 * A controller for course search.
 * @param req user's request
 * @param res response to user's request
 * @param next the function that will be called if an exception is thrown
 */
export default async function(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} Begin Retrieving Course Data...`);
        let courses: object[] = (req.body.options.aggregate) ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)} ${JSON.stringify(courses)}`);
        res.json({
            success: true,
            aggregate: req.body.options.aggregate,
            data: courses
        });
    } catch (exception: any) {
        next(exception);
    }
}

/**
 * Fetch aggregate course data based on user parameters
 * @param req user's request
 * @returns a promise for the aggregate data
 */
async function getAggregatedStatistics(req: express.Request): Promise<RawAggregateCourseData[]> {
    let [aggregateQuery, parameters]: [string, string[]] = createAggregateQueryWithParameters(req);
    let result: RawAggregateCourseData[] = await sequelize.query(aggregateQuery, {
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

/**
 * Fetch a list of course data based on user parameters
 * @param req user's request
 * @returns a promise for a list of course data that the instructors are stored into an array instead of a string
 */
async function getAssociatedCourses(req: express.Request): Promise<ProcessedCourseData[]> {
    let data: RawCourseData[] = await getAssociatedCourseList(req), result: ProcessedCourseData[] = [];
    data.forEach((course: RawCourseData) => {
        result.push({
            ...course,
            instructors: course['instructors'].split(`/`)
        });
    });
    return result;
}

/**
 * Create a SQL query based on whether the instructor is provided or not
 * @param instructor the instructor parameter from user parameters
 * @returns a string for a SQL query
 */
function createAggregateQuery(instructor: string): string {
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

/**
 * Compute the query and its parameters for aggregate data
 * @param req user's request
 * @returns a string for the SQL query and an array of strings for the query's parameters
 */
function createAggregateQueryWithParameters(req: express.Request): [string, string[]] {
    let aggregateQuery: string = createAggregateQuery(req.body.values.instructor);
    let parameters: string[] = [];

    if (req.body.values.courseCode !== null && req.body.values.courseCode !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.course_code = ?`;
        parameters.push(req.body.values.courseCode);
    }
    if (req.body.values.courseNumber !== null && req.body.values.courseNumber !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.course_number = ?`;
        parameters.push(req.body.values.courseNumber.toUpperCase());
    }
    if (req.body.values.department !== null && req.body.values.department !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.department = ?`;
        parameters.push(req.body.values.department.toUpperCase());
    }
    if (req.body.values.quarter !== null && req.body.values.quarter !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.quarter = ?`;
        parameters.push(req.body.values.quarter);
    }
    if (req.body.values.year !== null && req.body.values.year !== undefined) {
        aggregateQuery = `${aggregateQuery} AND C.year = ?`;
        parameters.push(req.body.values.year);
    }
    if (req.body.values.instructor !== null && req.body.values.instructor !== undefined) {
        aggregateQuery = `${aggregateQuery} AND I.name = ?`;
        parameters.push(req.body.values.instructor.toUpperCase());
    }

    return [aggregateQuery, parameters];
}

/**
 * Fetch a list of course data where instructors are stored into a string
 * @param req user's request
 * @returns a promise for a list of course data that all instructors are stored into a string
 */
async function getAssociatedCourseList(req: express.Request): Promise<RawCourseData[]> {
    let [query, parameters]: [string, CourseDataQueryParameters] = createAssociatedCourseListQueryWithParameters(req);
    let courses: RawCourseData[] = await sequelize.query(query, {
        replacements: parameters,
        type: Sequelize.QueryTypes.SELECT
    });
    return courses;
}

/**
 * Return an array of a big SQL query
 * @returns an array that makes up a SQL string
 */
function createAssociatedCourseListQuery(): string[] {
    return [
        `SELECT
            C.year,
            C.quarter,
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
}

/**
 * Compute the query and its parameters for a list of course data
 * @param req user's request
 * @returns a string for the SQL query and an object for the query's parameters
 */
function createAssociatedCourseListQueryWithParameters(req: express.Request): [string, CourseDataQueryParameters] {
    let tokens: string[] = createAssociatedCourseListQuery();
    let parameters: CourseDataQueryParameters = { offset: req.body.options.offset };

    if (req.body.values.courseCode !== null && req.body.values.courseCode !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_code = :courseCode`;
        parameters.courseCode = req.body.values.courseCode;
    }
    if (req.body.values.courseNumber !== null && req.body.values.courseNumber !== undefined) {
        tokens[1] = `${tokens[1]} AND C.course_number = :courseNumber`;
        parameters.courseNumber = req.body.values.courseNumber.toUpperCase();
    }
    if (req.body.values.department !== null && req.body.values.department !== undefined) {
        tokens[1] = `${tokens[1]} AND C.department = :department`;
        parameters.department = req.body.values.department.toUpperCase();
    }
    if (req.body.values.quarter !== null && req.body.values.quarter !== undefined) {
        tokens[1] = `${tokens[1]} AND C.quarter = :quarter`;
        parameters.quarter = req.body.values.quarter;
    }
    if (req.body.values.year !== null && req.body.values.year !== undefined) {
        tokens[1] = `${tokens[1]} AND C.year = :year`;
        parameters.year = req.body.values.year;
    }
    if (req.body.values.instructor !== null && req.body.values.instructor !== undefined) {
        tokens[0] = `${tokens[0]}, Instructor I`;
        tokens[1] = `${tokens[1]} AND C.course_id = I.course_id AND IV.course_id = I.course_id AND I.name = :instructor`;
        parameters.instructor = req.body.values.instructor.toUpperCase();
    }

    return [tokens.join(' '), parameters];
}
