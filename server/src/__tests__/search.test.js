const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe('POST /api/v1/search', () => {
    describe('sending malformed requests', () => {
        test('should respond with a failed status when there is nothing', async () => {
            const response = await request.post('/api/v1/search');
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when parameters are off', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    p1: {},
                    p2: {}
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when parameters are empty', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {},
                    options: {}
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });
    
    describe('sending requests with missing fields', () => {
        test('should respond with a failed status when the department field is gone since it is nullable', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
                        courseNumber: null,
                        courseCode: 45505,
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
        test('should respond with a failed status when the term field is gone since it is nullable', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        department: 'ECON',
                        courseNumber: '210A',
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
                        department: null,
                        courseNumber: null,
                        courseCode: null,
                        instructor: 'KLEFSTAD, R.'
                    },
                    options: {
                        offset: null
                    }
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });
    
    describe('sending requests with invalid parameters', () => {
        test('should respond with a failed status when parameters are all null', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
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
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when parameters except options are all null', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
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
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when parameters except values are all null', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Spring 2021',
                        department: 'COMPSCI',
                        courseNumber: '261P',
                        courseCode: 35210,
                        instructor: 'SHINDLER, M.'
                    },
                    options: {
                        aggregate: null,
                        offset: null
                    }
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when parameters type are different from expectations', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 225,
                        department: 5+5,
                        courseNumber: 261,
                        courseCode: 'testingtesting',
                        instructor: null
                    },
                    options: {
                        aggregate: -3,
                        offset: null
                    }
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('sending requests with partially valid parameters', () => {
        test('should respond with a failed status 1', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Winter 2020',
                        department: null,
                        courseNumber: null,
                        courseCode: '123A',
                        instructor: null
                    },
                    options: {
                        aggregate: false,
                        offset: 0
                    }
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status 2', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Winter 2020',
                        department: null,
                        courseNumber: null,
                        courseCode: '            ',
                        instructor: null
                    },
                    options: {
                        aggregate: null,
                        offset: null
                    }
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('sending requests with valid parameters', () => {
        test('should respond successfully when only one parameter has correct data', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Fall 2021',
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Spring 2021',
                        department: 'EDUC',
                        courseNumber: '247',
                        courseCode: null,
                        instructor: 'GUARINO, J.'
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
                        department: 'COMPSCI',
                        courseNumber: '260',
                        courseCode: null,
                        instructor: 'DILLENCOURT, M.'
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Spring 2021',
                        department: 'COMPSCI',
                        courseNumber: '261P',
                        courseCode: 35210,
                        instructor: 'SHINDLER, M.'
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Fall 2020',
                        department: 'SWE',
                        courseNumber: '250P',
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
        test('should respond zero match since there is no such class 1', async () => {
            const response = await request
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
                        department: 'DEPT',
                        courseNumber: '101',
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: null,
                        department: 'DEPT',
                        courseNumber: '201',
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Fall 2020',
                        department: 'SWE',
                        courseNumber: '246P',
                        courseCode: null,
                        instructor: 'LOPES, C.'
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Fall 2020',
                        department: 'SWE',
                        courseNumber: '250P',
                        courseCode: 37945,
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Winter 2021',
                        department: 'COMPSCI',
                        courseNumber: '230',
                        courseCode: 34770,
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
                .post('/api/v1/search')
                .send({
                    values: {
                        term: 'Spring 2020',
                        department: null,
                        courseNumber: null,
                        courseCode: 34750,
                        instructor: 'HAVVAEI, H.'
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
