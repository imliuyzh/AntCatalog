const supertest = require('supertest');
const app = require('../../app');
const internalErrorHandler = require('../middlewares/internalErrorHandler');

const request = supertest(app);

describe('GET /invalid-route', () => {
    test('should respond with 404 status when sending requests to an endpoint that does not exist', async () => {
        const response = await request.get('/invalid-route');
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });
    test('should respond with 500 status when there is an internal error', async () => {
        let req = {
            params: {},
            body: {}
        };
        let res = {
            code: null,
            data: null,
            status(status) {
                this.code = status;
                return this;
            },
            send(payload) {
                this.data = payload;
            },
            json(payload) {
                this.send(payload);
            }
        };
        let next = jest.fn();

        internalErrorHandler(new Error(), req, res, next);
        expect(res.code).toBe(500);
        expect(res.data.info).toBe('Encountered an Internal Server-Side Error.');
    });
});
