import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('GET /complete/instructors', () => {
    describe('sending malformed requests', () => {
        test('should respond with a failed status when there is nothing', async () => {
            const response = await request.get('/complete/instructors');
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when there is only name=', async () => {
            const response = await request.get('/complete/instructors?name=');
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when there are professor=&course=ICS32', async () => {
            const response = await request.get('/complete/instructors?professor=&course=ICS32');
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });

    describe('no matches for strings of length < 3', () => {
        test('should respond with success with prof. klefstad', async () => {
            const response = await request.get('/complete/instructors?name=zv');
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches.length).toBe(0);
        });
    });

    describe('cannot have empty strings', () => {
        test('', async () => {
            const response = await request.get('/complete/instructors?name=');
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test(' ', async () => {
            const response = await request.get(`/complete/instructors?name=${encodeURIComponent(' ')}`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('                                ', async () => {
            const response = await request.get(`/complete/instructors?name=${encodeURIComponent('                                ')}`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });

    describe('should have at most five matches at any given time', () => {
        test('should respond with SHINDLER, M. when given shnidler', async () => {
            const response = await request.get('/complete/instructors?name=shnidler');
            expect(response.body.matches.length).toBeLessThanOrEqual(5);
        });
        test('should have only 5 results', async () => {
            const response = await request.get('/complete/instructors?name=abc');
            expect(response.body.matches.length).toBe(5);
        });
    });

    describe('giving valid professor names', () => {
        test('should respond with no match since Prof. Thornton does not teach graduate classes', async () => {
            const response = await request.get('/complete/instructors?name=thornton');
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            for (let match of response.body.matches) {
                expect(match.item).not.toBe('THORNTON, A.');
            }
        });
        test('should respond with success with Prof. Klefstad', async () => {
            const response = await request.get('/complete/instructors?name=klefstad');
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('KLEFSTAD, R.');
        });
        test('should respond with success with Prof. Dillencourt', async () => {
            const response = await request.get(`/complete/instructors?name=${encodeURIComponent('DILLENCOURT, M.')}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('DILLENCOURT, M.');
        });
        test('should not have two professors at the same time', async () => {
            const response = await request.get('/complete/instructors?name=klefstad&name=pattis');
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });
    
    describe('giving misspelled professor names', () => {
        test('should respond with SHINDLER, M. when given shnidler', async () => {
            const response = await request.get('/complete/instructors?name=shnidler');
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('SHINDLER, M.');
        });
        test('should respond with NAVARRO, E. when given NAVRO, E.', async () => {
            const response = await request.get(`/complete/instructors?name=${encodeURIComponent('NAVRO, E.')}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('NAVARRO, E.');
        });
        test('should respond with ZIV, H. when given zivvv', async () => {
            const response = await request.get('/complete/instructors?name=zivvv');
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('ZIV, H.');
        });
    });
});
