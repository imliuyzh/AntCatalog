import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

const ROUTE = '/instructors';
const request = supertest(app);

describe('GET /instructors', () => {
    describe('sending malformed requests', () => {
        test('should respond with a failed status when there is nothing', async () => {
            const response = await request.get(ROUTE);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when there is only name=', async () => {
            const response = await request.get(`${ROUTE}?name=`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('should respond with a failed status when there given invalid parameters', async () => {
            const response = await request.get(`${ROUTE}?professor=&course=ICS32`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });

    describe('no matches for strings of length < 2', () => {
        test('should respond with a failed status when value is n', async () => {
            const response = await request.get(`${ROUTE}?name=n`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });
    
    describe('no matches for long strings', () => {
        test('should respond with a failed status when the value is too long', async () => {
            const response = await request.get(`${ROUTE}?name=${encodeURIComponent('Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Commodo ullamcorper a lacus vestibulum sed. Tortor id aliquet lectus proin. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Risus ultricies tristique nulla aliquet enim tortor at auctor. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Adipiscing elit duis tristique sollicitudin nibh. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Phasellus egestas tellus rutrum tellus pellentesque. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Gravida arcu ac tortor dignissim convallis. Odio ut sem nulla pharetra. Arcu dui vivamus arcu felis bibendum ut tristique et egestas. Nisi lacus sed viverra tellus. Faucibus purus in massa tempor. At erat pellentesque adipiscing commodo. Nulla facilisi nullam vehicula ipsum a arcu cursus. Massa eget egestas purus viverra accumsan in nisl nisi. Scelerisque in dictum non consectetur a erat nam.')}`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });

    describe('cannot have empty strings', () => {
        test('', async () => {
            const response = await request.get(`${ROUTE}?name=`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test(' ', async () => {
            const response = await request.get(`${ROUTE}?name=${encodeURIComponent(' ')}`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
        test('                                ', async () => {
            const response = await request.get(`${ROUTE}?name=${encodeURIComponent('                                ')}`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });

    describe('should have at most five matches at any given time', () => {
        test('should respond with SHINDLER, M. when given shnidler', async () => {
            const response = await request.get(`${ROUTE}?name=shnidler`);
            expect(response.body.matches.length).toBeLessThanOrEqual(5);
        });
        test('should have only 5 results', async () => {
            const response = await request.get(`${ROUTE}?name=abc`);
            expect(response.body.matches.length).toBe(5);
        });
    });

    describe('giving valid professor names', () => {
        test('should respond with no match since Prof. Thornton does not teach graduate classes', async () => {
            const response = await request.get(`${ROUTE}?name=thornton`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            for (let match of response.body.matches) {
                expect(match.item).not.toBe('THORNTON, A.');
            }
        });
        test('should respond with success with Prof. Klefstad', async () => {
            const response = await request.get(`${ROUTE}?name=klefstad`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('KLEFSTAD, R.');
        });
        test('should respond with success with Prof. Dillencourt', async () => {
            const response = await request.get(`${ROUTE}?name=${encodeURIComponent('DILLENCOURT, M.')}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('DILLENCOURT, M.');
        });
        test('should not have two professors at the same time', async () => {
            const response = await request.get(`${ROUTE}?name=klefstad&name=pattis`);
            expect(response.statusCode).toBe(422);
            expect(response.body.success).toBe(false);
        });
    });
    
    describe('giving misspelled professor names', () => {
        test('should respond with SHINDLER, M. when given shnidler', async () => {
            const response = await request.get(`${ROUTE}?name=shnidler`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('SHINDLER, M.');
        });
        test('should respond with NAVARRO, E. when given NAVRO, E.', async () => {
            const response = await request.get(`${ROUTE}?name=${encodeURIComponent('NAVRO, E.')}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('NAVARRO, E.');
        });
        test('should respond with ZIV, H. when given zivvv', async () => {
            const response = await request.get(`${ROUTE}?name=zivvv`);
            expect(response.statusCode).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.matches[0]).toBe('ZIV, H.');
        });
    });
});
