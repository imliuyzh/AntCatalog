import supertest from 'supertest';
import app from '../app';
import internalErrorHandler from '../middlewares/internalErrorHandler';

const request = supertest(app);

describe('GET /invalid-route', () => {
    test('should respond with 404 status when sending requests to an endpoint that does not exist', async () => {
        const response = await request.get('/invalid-route');
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });
    test('should respond with 500 status when there is an internal error', async () => {
        let res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        let error = {
            name: 'error',
            statusCode: 500,
            status: 1,
            message: 'Encountered an Internal Server-Side Error.',
            error: 'string'
        };

        internalErrorHandler(error, {}, res, jest.fn());
        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Encountered an Internal Server-Side Error.');
    });
});
