import { describe, expect, jest, test } from '@jest/globals';
import supertest from 'supertest';

import app from '../app';
import instructorController from '../controllers/instructorController';

const request = supertest(app);

jest.mock('../controllers/instructorController');

describe('miscellaneous cases', () => {
    test('should respond with 404 status when sending requests to an endpoint that does not exist', async () => {
        const response = await request.get('/invalid-route');
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });
    test('should respond with 500 status when there is an internal error', async () => {
        const MockedInstructorController = instructorController as unknown as jest.Mock<typeof instructorController>;
        MockedInstructorController.mockImplementation(() => {
            throw new Error();
        });

        const response = await request.get('/instructors?name=name');
        expect(response.statusCode).toBe(500);
        expect(response.body.info).toBe('Encountered an internal server error.');
    });
});
