import express from 'express';
import Sequelize from 'sequelize';

import logger from '../utils/logger';
import sequelize from '../db/sequelize';
import { validateField } from '../utils/courseControllerUtilities';

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

type AggregatedCourseDataQueryParameters = {
    year?: number,
    quarter?: string,
    courseCode?: number,
    department?: string,
    courseNumber?: string,
    instructor?: string
};

type AssociatedCourseDataQueryParameters = {
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
        let courses: object[] = (req.body.options.aggregate) ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
        res.json({
            success: true,
            aggregate: req.body.options.aggregate,
            data: courses
        });
        logger.info('INFO: Course Data Retrieved', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
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
    let [aggregateQuery, parameters]: [string, AggregatedCourseDataQueryParameters] = createAggregateQueryWithParameters(req);
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
function createAggregateQueryWithParameters(req: express.Request): [string, AggregatedCourseDataQueryParameters] {
    let aggregateQuery: string = createAggregateQuery(req.body.values.instructor);
    let parameters: AggregatedCourseDataQueryParameters = {};

    if (validateField(req.body.values.courseCode)) {
        aggregateQuery = `${aggregateQuery} AND C.course_code IN (:courseCode)`;
        parameters.courseCode = req.body.values.courseCode;
    }
    if (validateField(req.body.values.courseNumber)) {
        aggregateQuery = `${aggregateQuery} AND C.course_number IN (:courseNumber)`;
        parameters.courseNumber = req.body.values.courseNumber.map((number: string) => number.toUpperCase());
    }
    if (validateField(req.body.values.department)) {
        aggregateQuery = `${aggregateQuery} AND C.department IN (:department)`;
        parameters.department = req.body.values.department.map((dept: string) => dept.toUpperCase());
    }
    if (validateField(req.body.values.quarter)) {
        aggregateQuery = `${aggregateQuery} AND C.quarter IN (:quarter)`;
        parameters.quarter = req.body.values.quarter.map((qtr: string) => qtr[0].toUpperCase() + qtr.slice(1, qtr.length).toLowerCase());
    }
    if (validateField(req.body.values.year)) {
        aggregateQuery = `${aggregateQuery} AND C.year IN (:year)`;
        parameters.year = req.body.values.year;
    }
    if (validateField(req.body.values.instructor)) {
        aggregateQuery = `${aggregateQuery} AND I.name IN (:instructor)`;
        parameters.instructor = req.body.values.instructor.map((inst: string) => inst.toUpperCase());
    }

    return [aggregateQuery, parameters];
}

/**
 * Fetch a list of course data where instructors are stored into a string
 * @param req user's request
 * @returns a promise for a list of course data that all instructors are stored into a string
 */
async function getAssociatedCourseList(req: express.Request): Promise<RawCourseData[]> {
    let [query, parameters]: [string, AssociatedCourseDataQueryParameters] = createAssociatedCourseListQueryWithParameters(req);
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
function createAssociatedCourseListQueryWithParameters(req: express.Request): [string, AssociatedCourseDataQueryParameters] {
    let tokens: string[] = createAssociatedCourseListQuery();
    let parameters: AssociatedCourseDataQueryParameters = { offset: req.body.options.offset };

    if (validateField(req.body.values.courseCode)) {
        tokens[1] = `${tokens[1]} AND C.course_code IN (:courseCode)`;
        parameters.courseCode = req.body.values.courseCode;
    }
    if (validateField(req.body.values.courseNumber)) {
        tokens[1] = `${tokens[1]} AND C.course_number IN (:courseNumber)`;
        parameters.courseNumber = req.body.values.courseNumber.map((number: string) => number.toUpperCase());
    }
    if (validateField(req.body.values.department)) {
        tokens[1] = `${tokens[1]} AND C.department IN (:department)`;
        parameters.department = req.body.values.department.map((dept: string) => dept.toUpperCase());
    }
    if (validateField(req.body.values.quarter)) {
        tokens[1] = `${tokens[1]} AND C.quarter IN (:quarter)`;
        parameters.quarter = req.body.values.quarter.map((qtr: string) => qtr[0].toUpperCase() + qtr.slice(1, qtr.length).toLowerCase());
    }
    if (validateField(req.body.values.year)) {
        tokens[1] = `${tokens[1]} AND C.year IN (:year)`;
        parameters.year = req.body.values.year;
    }
    if (validateField(req.body.values.instructor)) {
        tokens[0] = `${tokens[0]}, Instructor I`;
        tokens[1] = `${tokens[1]} AND C.course_id = I.course_id AND IV.course_id = I.course_id AND I.name IN (:instructor)`;
        parameters.instructor = req.body.values.instructor.map((inst: string) => inst.toUpperCase());
    }

    return [tokens.join(' '), parameters];
}
