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
 * A controller for the course search endpoint.
 * @param req An object for user's request.
 * @param res An object for the response to user's request.
 * @param next The function that will be called if an exception is thrown.
 */
export default async function listCourses(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
        let courses: object[] = req.body.options.aggregate ? await getAggregatedStatistics(req) : await getAssociatedCourses(req);
        res.json({
            success: true,
            aggregate: req.body.options.aggregate,
            data: courses
        });
        logger.info('INFO: Retrieved /courses Data', {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            body: JSON.stringify(req.body, null, 2),
            data: JSON.stringify(courses)
        });
    } catch (exception: any) {
        next(exception);
    }
}

/**
 * Fetch aggregate course data based on user parameters.
 * @param req An object for user's request.
 * @returns A promise for the aggregate data.
 */
async function getAggregatedStatistics(req: express.Request): Promise<RawAggregateCourseData[]> {
    let [aggregateQuery, replacements]: [string, AggregatedCourseDataQueryParameters] = createAggregateQueryWithParameters(req);
    let result: RawAggregateCourseData[] = await sequelize.query(aggregateQuery, {
        replacements,
        type: Sequelize.QueryTypes.SELECT
    });
    let { gradeACount, gradeBCount, gradeCCount, gradeDCount, gradeFCount } = result[0];
    return ([gradeACount, gradeBCount, gradeCCount, gradeDCount, gradeFCount].some((count: number) => count > 0)) ? result : [];
}

/**
 * Compute the query and its parameters for aggregate data.
 * @param req An object for user's request.
 * @returns A string for the SQL query and an object for the query's parameters.
 */
 function createAggregateQueryWithParameters(req: express.Request): [string, AggregatedCourseDataQueryParameters] {
    let aggregateQuery: string = createAggregateQuery(req.body.values.instructor);
    let replacements: AggregatedCourseDataQueryParameters = {};

    if (req.body.values.courseCode.length > 0) {
        aggregateQuery = `${aggregateQuery} AND C.course_code IN (:courseCode)`;
        replacements.courseCode = req.body.values.courseCode;
    }
    if (req.body.values.courseNumber.length > 0) {
        aggregateQuery = `${aggregateQuery} AND C.course_number IN (:courseNumber)`;
        replacements.courseNumber = req.body.values.courseNumber;
    }
    if (req.body.values.department.length > 0) {
        aggregateQuery = `${aggregateQuery} AND C.department IN (:department)`;
        replacements.department = req.body.values.department;
    }
    if (req.body.values.quarter.length > 0) {
        aggregateQuery = `${aggregateQuery} AND C.quarter IN (:quarter)`;
        replacements.quarter = req.body.values.quarter;
    }
    if (req.body.values.year.length > 0) {
        aggregateQuery = `${aggregateQuery} AND C.year IN (:year)`;
        replacements.year = req.body.values.year;
    }
    if (req.body.values.instructor.length > 0) {
        aggregateQuery = `${aggregateQuery} AND I.name IN (:instructor)`;
        replacements.instructor = req.body.values.instructor;
    }

    return [aggregateQuery, replacements];
}

/**
 * Create a SQL query based on whether the instructor is provided or not.
 * @param instructor The value of the instructor parameter in user parameters.
 * @returns The basis for the SQL query template.
 */
 function createAggregateQuery(instructor: string[]): string {
    return (instructor.length > 0)
        ? `SELECT
            IFNULL(SUM(C.grade_a_count), 0) AS gradeACount,
            IFNULL(SUM(C.grade_b_count), 0) AS gradeBCount,
            IFNULL(SUM(C.grade_c_count), 0) AS gradeCCount,
            IFNULL(SUM(C.grade_d_count), 0) AS gradeDCount,
            IFNULL(SUM(C.grade_f_count), 0) AS gradeFCount,
            IFNULL(SUM(C.grade_p_count), 0) AS gradePCount,
            IFNULL(SUM(C.grade_np_count), 0) AS gradeNpCount,
            IFNULL(AVG(C.gpa_avg), 0) AS gpaAvg
           FROM
            Course C,
            Instructor I
           WHERE C.course_id = I.course_id`
        : `SELECT
            IFNULL(SUM(C.grade_a_count), 0) AS gradeACount,
            IFNULL(SUM(C.grade_b_count), 0) AS gradeBCount,
            IFNULL(SUM(C.grade_c_count), 0) AS gradeCCount,
            IFNULL(SUM(C.grade_d_count), 0) AS gradeDCount,
            IFNULL(SUM(C.grade_f_count), 0) AS gradeFCount,
            IFNULL(SUM(C.grade_p_count), 0) AS gradePCount,
            IFNULL(SUM(C.grade_np_count), 0) AS gradeNpCount,
            IFNULL(AVG(C.gpa_avg), 0) AS gpaAvg
           FROM Course C
           WHERE 1 = 1`;
}

/**
 * Fetch a list of course data based on user parameters.
 * @param req An object for user's request.
 * @returns A promise for a list of course data that the instructors are separated into an array.
 */
async function getAssociatedCourses(req: express.Request): Promise<ProcessedCourseData[]> {
    let [query, replacements]: [string, AssociatedCourseDataQueryParameters] = createAssociatedCourseListQueryWithParameters(req);
    let courses: RawCourseData[] = await sequelize.query(query, {
        replacements,
        type: Sequelize.QueryTypes.SELECT
    });
    return courses.map((course: RawCourseData) => ({
        ...course,
        instructors: course['instructors'].split(`/`)
    }));
}

/**
 * Compute the query and its parameters for a list of course data.
 * @param req An object for user's request.
 * @returns A string for the SQL query and an object for the query's parameters.
 */
 function createAssociatedCourseListQueryWithParameters(req: express.Request): [string, AssociatedCourseDataQueryParameters] {
    let tokens: string[] = createAssociatedCourseListQuery();
    let replacements: AssociatedCourseDataQueryParameters = { offset: req.body.options.offset };

    if (req.body.values.courseCode.length > 0) {
        tokens[1] = `${tokens[1]} AND C.course_code IN (:courseCode)`;
        replacements.courseCode = req.body.values.courseCode;
    }
    if (req.body.values.courseNumber.length > 0) {
        tokens[1] = `${tokens[1]} AND C.course_number IN (:courseNumber)`;
        replacements.courseNumber = req.body.values.courseNumber;
    }
    if (req.body.values.department.length > 0) {
        tokens[1] = `${tokens[1]} AND C.department IN (:department)`;
        replacements.department = req.body.values.department;
    }
    if (req.body.values.quarter.length > 0) {
        tokens[1] = `${tokens[1]} AND C.quarter IN (:quarter)`;
        replacements.quarter = req.body.values.quarter;
    }
    if (req.body.values.year.length > 0) {
        tokens[1] = `${tokens[1]} AND C.year IN (:year)`;
        replacements.year = req.body.values.year;
    }
    if (req.body.values.instructor.length > 0) {
        tokens[0] = `${tokens[0]}, Instructor I`;
        tokens[1] = `${tokens[1]} AND C.course_id = I.course_id AND IV.course_id = I.course_id AND I.name IN (:instructor)`;
        replacements.instructor = req.body.values.instructor;
    }

    return [tokens.join(' '), replacements];
}

/**
 * Return an array for the basis of a SQL query for fetching individual courses.
 * @returns An array that makes up the basis a SQL query.
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
