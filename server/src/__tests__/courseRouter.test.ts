import supertest from 'supertest';
import app from '../app';

const ROUTE = '/courses';
const request = supertest(app);

describe('POST /courses', () => {
    describe('single parameter tests', () => {
        describe('sending malformed requests', () => {
            test('should respond with a failed status when there is nothing', async () => {
                const response = await request.post(ROUTE);
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when parameters are off', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        p1: {},
                        p2: {}
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when parameters are empty', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {},
                        options: {}
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when body is malformed 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .set('Content-Type', 'application/json')
                    .send(`{
                        options: {
                            "aggregate": false,
                            "offset": 0
                        `
                    );
                expect(response.statusCode).toBe(500);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when body is malformed 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .set('Content-Type', 'application/json')
                    .send(`{`);
                expect(response.statusCode).toBe(500);
                expect(response.body.success).toBe(false);
            });
        });
        
        describe('sending requests with missing fields', () => {
            test('should respond successfully where the entire values object is gone since none of it is mandatory', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(1);
            });
            test('should respond when the offset field is gone since it looks for aggregate data', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            courseNumber: null,
                            courseCode: [45505],
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
            test('should respond when the year and quarter field are gone since they are nullable', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            department: ['ECON'],
                            courseNumber: ['210A'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
            test('should respond with a failed status when the aggregated field is gone because it is required', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: null,
                            courseNumber: null,
                            courseCode: null,
                            instructor: ['KLEFSTAD, R.']
                        },
                        options: {
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when aggregate is missing 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .set('Content-Type', 'application/json')
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            courseNumber: null,
                            courseCode: [45505],
                            instructor: null
                        },
                        options: {}
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when aggregate is missing 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .set('Content-Type', 'application/json')
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            courseNumber: null,
                            courseCode: [45505],
                            instructor: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
        });
        
        describe('sending requests with invalid parameters', () => {
            test('should respond with a failed status when parameters are all null', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: null,
                            courseNumber: null,
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: null,
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when parameters except values are all null', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ['Spring'],
                            department: ['COMPSCI'],
                            courseNumber: ['261P'],
                            courseCode: [35210],
                            instructor: ['SHINDLER, M.']
                        },
                        options: {
                            aggregate: null,
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when parameters type are different from expectations', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: ['2021'],
                            quarter: [225],
                            department: [5+5],
                            courseNumber: [261],
                            courseCode: 'testingtesting',
                            instructor: null
                        },
                        options: {
                            aggregate: -3,
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
        });

        describe('sending requests with partially valid parameters', () => {
            test('should respond with a failed status 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: null,
                            courseNumber: null,
                            courseCode: ['A123'],
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: null,
                            courseNumber: null,
                            courseCode: ['            '],
                            instructor: null
                        },
                        options: {
                            aggregate: null,
                            offset: null
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
        });

        describe('sending requests with valid parameters', () => {
            test('should respond successfully when only one parameter has correct data', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ['Fall'],
                            department: null,
                            courseNumber: null,
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                            offset: 100
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
            });
            test('should have correct aggregated data for educ 247 in spring 2021 with most fields filled out', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ['Spring'],
                            department: ['EDUC'],
                            courseNumber: ['247'],
                            courseCode: null,
                            instructor: ['GUARINO, J.']
                        },
                        options: {
                            aggregate: true
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(response.body.data[0].gradeACount).toBe(70);
                expect(response.body.data[0].gradeBCount).toBe(7);
                expect(response.body.data[0].gradeCCount).toBe(0);
                expect(response.body.data[0].gradeDCount).toBe(0);
                expect(response.body.data[0].gradeFCount).toBe(1);
                expect(response.body.data[0].gradePCount).toBe(0);
                expect(response.body.data[0].gradeNpCount).toBe(0);
            });
            test('should respond successfully when some parameters have correct data', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: ['COMPSCI'],
                            courseNumber: ['260'],
                            courseCode: null,
                            instructor: ['DILLENCOURT, M.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBeGreaterThan(1);
            });
            test('should respond successfully when all parameters have correct data', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ['Spring'],
                            department: ['COMPSCI'],
                            courseNumber: ['261P'],
                            courseCode: [35210],
                            instructor: ['SHINDLER, M.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                expect(response.body.data[0].gradeACount).toBe(46);
                expect(response.body.data[0].gradeBCount).toBe(2);
                expect(response.body.data[0].gradeCCount).toBe(0);
                expect(response.body.data[0].gradeDCount).toBe(0);
                expect(response.body.data[0].gradeFCount).toBe(0);
                expect(response.body.data[0].gradePCount).toBe(0);
                expect(response.body.data[0].gradeNpCount).toBe(0);
            });
            test('should respond successfully without specifying the value for offset', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Fall'],
                            department: ['SWE'],
                            courseNumber: ['250P'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(1);
            });
            test('should have no count since there is no such class 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: ['DEPT'],
                            courseNumber: ['101'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(0);
            });
            test('should respond zero match since there is no such class 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: ['DEPT'],
                            courseNumber: ['201'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(0);
            });
        });
        
        describe('courses with multiple instructors', () => {
            test('swe 246p should have three instructors', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Fall'],
                            department: ['SWE'],
                            courseNumber: ['246P'],
                            courseCode: null,
                            instructor: ['LOPES, C.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBeGreaterThanOrEqual(1);
                expect(response.body.data[0].gradeACount).toBe(20);
                expect(response.body.data[0].gradeBCount).toBe(4);
                expect(response.body.data[0].gradeCCount).toBe(0);
                expect(response.body.data[0].gradeDCount).toBe(0);
                expect(response.body.data[0].gradeFCount).toBe(10);
                expect(response.body.data[0].gradePCount).toBe(0);
                expect(response.body.data[0].gradeNpCount).toBe(0);
                expect(response.body.data[0].instructors).toEqual(expect.arrayContaining(['LOPES, C.', 'CHEN, J.', 'NAGARAJAN, S.']));
            });
            test('swe 250p should have two instructors', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Fall'],
                            department: ['SWE'],
                            courseNumber: ['250P'],
                            courseCode: [37945],
                            instructor: null
                        },
                        options: {
                            aggregate: false
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(1);
                expect(response.body.data[0].gradeACount).toBe(34);
                expect(response.body.data[0].gradeBCount).toBe(2);
                expect(response.body.data[0].gradeCCount).toBe(0);
                expect(response.body.data[0].gradeDCount).toBe(0);
                expect(response.body.data[0].gradeFCount).toBe(5);
                expect(response.body.data[0].gradePCount).toBe(0);
                expect(response.body.data[0].gradeNpCount).toBe(0);
                expect(response.body.data[0].instructors).toEqual(expect.arrayContaining(['LOPES, C.', 'KUTAS, D.']));
            });
        });

        describe('get all instructors no matter an instructor is specified or not', () => {
            test('display two instructors for cs 230 in winter 2021 when no one is specified', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ['Winter'],
                            department: ['COMPSCI'],
                            courseNumber: ['230'],
                            courseCode: [34770],
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(1);
                expect(response.body.data[0].instructors).toEqual(expect.arrayContaining(['VENKATASUBRAMA, N.', 'VENKATESWARAN, P.']));
            });
            test('display two instructors for cs 261 in spring 2020 when one is specified', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Spring'],
                            department: null,
                            courseNumber: null,
                            courseCode: [34750],
                            instructor: ['HAVVAEI, H.']
                        },
                        options: {
                            aggregate: false,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(1);
                expect(response.body.data[0].instructors).toEqual(expect.arrayContaining(['EPPSTEIN, D.', 'HAVVAEI, H.']));
            });
        });
    });

    describe('multiple parameters tests', () => {
        describe('sending with typical arguments', () => {
            test('my fall 2021 schedule', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ["Fall"],
                            department: ["COMPSCI"],
                            courseNumber: ["220P", "250P", "253P"],
                            courseCode: null,
                            instructor: ["KLEFSTAD, R.", "LI, C.", "BURTSEV, A."]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(3);
            });
            test('my spring 2022 schedule', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: ["Spring"],
                            department: ["COMPSCI"],
                            courseNumber: ["260P", "296P", "297P"],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(6);
            });
            test(`get 3 prof. wortman's 261P`, async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2019, 2020, 2022],
                            quarter: ["Winter", "Spring"],
                            department: ["COMPSCI"],
                            courseNumber: ["261P"],
                            courseCode: [35540, 35230, 35240],
                            instructor: ['WORTMAN, K.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(3);
            });
            test('get a class in the wrong time', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: ["Summer"],
                            department: ["COMPSCI"],
                            courseNumber: ["222", "232"],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(0);
            });
            test('get graduate networking classes 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2019, 2021],
                            quarter: ["Fall"],
                            department: ["COMPSCI", "EECS", "NET SYS"],
                            courseNumber: ["201", "232", "248A"],
                            courseCode: null,
                            instructor: ["LEVORATO, M."]
                        },
                        options: {
                            aggregate: false,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(6);
            });
            test('get graduate networking classes 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: ["Fall"],
                            department: ["COMPSCI", "EECS", "NET SYS"],
                            courseNumber: ["201", "232", "248A"],
                            courseCode: null,
                            instructor: ["LEVORATO, M."]
                        },
                        options: {
                            aggregate: true
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.68 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
            test('aggregate on one class only', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2017, 2021],
                            department: ["COMPSCI"],
                            courseNumber: ["261P"],
                            instructor: ["shindler, m."]
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.95 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
        });
        
        describe('no matches', () => {
            test('aggregate on non existent classes', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: ["EXP", "D2"],
                            courseNumber: ["001", "100"],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(0);
            });
            test('search on non existent classes', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            courseCode: [0_2522, 0_3234, 34654],
                        },
                        options: {
                            aggregate: false,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(0);
            });
        });

        describe('sending with unusual arguments', () => {
            test('retrieve aggregated data that includes the entire database 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: null,
                            courseNumber: null,
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(1);
            });
            test('retrieve aggregated data that includes the entire database 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [],
                            quarter: [],
                            department: [],
                            courseNumber: [],
                            courseCode: [],
                            instructor: [],
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(true);
                expect(response.body.data.length).toBe(1);
            });
            test('should respond successfully when all fields under values are set to null', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: null,
                            department: null,
                            courseNumber: null,
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(15);
                expect(response.body.data[0].year).toBe(2013);
                expect(response.body.data[0].quarter).toBe('Summer');
            });
            test('should respond successfully when all fields under values are set to empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [],
                            quarter: [],
                            department: [],
                            courseNumber: [],
                            courseCode: [],
                            instructor: [],
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.aggregate).toBe(false);
                expect(response.body.data.length).toBe(15);
                expect(response.body.data[0].year).toBe(2013);
                expect(response.body.data[0].quarter).toBe('Summer');
            });
            test('sending with year as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [],
                            quarter: ['Fall'],
                            department: ['SWE'],
                            courseNumber: ['250p'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
            test('sending without year', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            quarter: ['Fall'],
                            department: ['SWE'],
                            courseNumber: ['250p'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
            test('sending with quarter as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: [],
                            department: ['SWE'],
                            courseNumber: ['250p'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 5
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(0);
            });
            test('sending without quarter', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            department: ['SWE'],
                            courseNumber: ['250p'],
                            courseCode: null,
                            instructor: null
                        },
                        options: {
                            aggregate: false,
                            offset: 5
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(0);
            });
            test('sending with department as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            department: [],
                            courseNumber: ['260p'],
                            courseCode: null,
                            instructor: ['SHINDLER, M.', 'DILLENCOURT, M.']
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.5 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
            test('sending without department', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            courseNumber: ['260p'],
                            courseCode: null,
                            instructor: ['SHINDLER, M.', 'DILLENCOURT, M.']
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.5 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
            test('sending with courseCode as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            department: [],
                            courseNumber: ['260p', '123p'],
                            courseCode: [],
                            instructor: ['SHINDLER, M.', 'DILLENCOURT, M.']
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.5 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
            test('sending without courseCode', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            department: [],
                            courseNumber: ['260p', '123p'],
                            instructor: ['SHINDLER, M.', 'DILLENCOURT, M.']
                        },
                        options: {
                            aggregate: true,
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(1);
                expect(Math.abs(3.5 - response.body.data[0].gpaAvg)).toBeCloseTo(1e-14);
            });
            test('sending with courseNumber as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            department: null,
                            courseNumber: [],
                            courseCode: null,
                            instructor: ['SHINDLER, M.', 'LEVORATO, M.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(3);
            });
            test('sending without courseNumber', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2022],
                            quarter: null,
                            department: null,
                            courseCode: null,
                            instructor: ['SHINDLER, M.', 'LEVORATO, M.']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
                expect(response.body.data.length).toBe(3);
            });
            test('sending with instructor as an empty array', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: null,
                            department: ["COMPSCI", "EECS", "NET SYS"],
                            courseNumber: ["201", "232", "248"],
                            courseCode: null,
                            instructor: []
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
            test('sending without instructor', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2021],
                            quarter: null,
                            department: ["COMPSCI", "EECS", "NET SYS"],
                            courseNumber: ["201", "232", "248"],
                            courseCode: null,
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(200);
                expect(response.body.success).toBe(true);
            });
        });

        describe('sending with unusual and invalid arguments', () => {
            test('should respond with a failed status when nulls are in a list', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            quarter: [null, null],
                            department: [null, null, null],
                            courseNumber: [null, null, null, null],
                            courseCode: [null, null, null, null, null],
                            instructor: [null, null, null, null, null, null]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when array is nested 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: null,
                            instructor: [['SHINDLER, M.'], 'WORTMAN, K.', [['KLEFSTAD, R.'], 'DILLENCOURT, M.']]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when array is nested 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [[]],
                            quarter: [[], []],
                            department: [[], [], []],
                            courseNumber: [[], [], [], []],
                            courseCode: [[], [], [], [], []],
                            instructor: [[], [], [], [], [], []]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('should respond with a failed status when array is nested 3', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [[null], null, [[null], null]],
                            instructor: [[null], null, [[null], null], null]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
        });

        describe('sending request with partly valid arguments', () => {
            test('partly valid arguments 1', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: [15412],
                            department: ["IN4MATX", "ENGLISH"],
                            courseNumber: [],
                            courseCode: [421],
                            instructor: ['STAFF1', 'STAFF2']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('partly valid arguments 2', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['feeweb23b'],
                            department: ["IN4MATX", "ENGLISH"],
                            courseNumber: [],
                            courseCode: [421],
                            instructor: ['STAFF1', 'STAFF2']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('partly valid arguments 3', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: [3.1415189, 1, 2, 3],
                            courseNumber: [],
                            courseCode: [421],
                            instructor: ['STAFF1', 'STAFF2']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('partly valid arguments 4', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: ['ART', 'MUSIC'],
                            courseNumber: [23532, 3412],
                            courseCode: [421],
                            instructor: ['STAFF1', 'STAFF2']
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('partly valid arguments 5', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: ['ART'],
                            courseNumber: ['23532', '3412'],
                            courseCode: ['vwevwe', 'vwevewv'],
                            instructor: []
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
            test('partly valid arguments 6', async () => {
                const response = await request
                    .post(ROUTE)
                    .send({
                        values: {
                            year: [2020],
                            quarter: ['Winter'],
                            department: ['ART'],
                            courseNumber: ['23532', '3412'],
                            courseCode: null,
                            instructor: [3, 2, 1]
                        },
                        options: {
                            aggregate: false,
                            offset: 0
                        }
                    });
                expect(response.statusCode).toBe(422);
                expect(response.body.success).toBe(false);
            });
        });
    });
});
