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
        test("should respond with a failed status when parameters except values are all null", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Spring 2021",
                        department: "COMPSCI",
                        courseNumber: "261P",
                        courseCode: 35210,
                        instructor: "SHINDLER, M."
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

    describe("sending requests with partially valid parameters", () => {
        test("should respond with a failed status 1", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Winter 2020",
                        department: null,
                        courseNumber: null,
                        courseCode: "123A",
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
        test("should respond with a failed status 2", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Winter 2020",
                        department: null,
                        courseNumber: null,
                        courseCode: "            ",
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

    describe("sending requests with valid parameters", () => {
        test("should respond successfully when only one parameter has correct data", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Fall 2021",
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
        test("should respond successfully when only one parameter has correct data but misspelled", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Fal 2021",
                        department: null,
                        courseNumber: null,
                        courseCode: null,
                        instructor: null
                    },
                    options: {
                        aggregate: false,
                        offset: 100
                    }
                });
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.aggregate).toBe(false);
        });
        test("should respond successfully when some parameters have correct data", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: null,
                        department: "COMPSCI",
                        courseNumber: "260",
                        courseCode: null,
                        instructor: "DILLENCOURT, M."
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
        test("should respond successfully when all parameters have correct data", async () => {
            const response = await request
                .post("/api/v1/search")
                .send({
                    values: {
                        term: "Spring 2021",
                        department: "COMPSCI",
                        courseNumber: "261P",
                        courseCode: 35210,
                        instructor: "SHINDLER, M."
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
        });
    });
});