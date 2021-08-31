const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

describe("POST /api/v1/search", () => {
    describe("sending malformed requests", () => {
        test("should respond with a failed status when there is nothing", async () => {
            const response = await request.post("/api/v1/search");
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test("should respond with a failed status when parameters are empty", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {},
                    options: {}
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.success).toBe(false);
        });
        test("should respond with a failed status when parameters are all null", async () => {
            const response = await request
                .post("/api/v1/search")
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
        test("should respond with a failed status when parameters except options are all null", async () => {
            const response = await request
                .post("/api/v1/search")
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
    });
});