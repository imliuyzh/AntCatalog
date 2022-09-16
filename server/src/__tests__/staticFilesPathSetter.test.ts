import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { determineIndexFilePath, determineStaticFileFolder } from '../utils/staticFilesPathSetter'; 

beforeAll(() => {
    process.env.NODE_ENV = 'production';
});

describe('test determineIndexFilePath()', () => {
    test('should respond with correct path when PRODUCTION_ENV is aws', () => {
        process.env.PRODUCTION_ENV = 'aws';
        expect(determineIndexFilePath()).toContain('client/build/index.html');
    });
    test('should respond with correct path when PRODUCTION_ENV is azure', () => {
        process.env.PRODUCTION_ENV = 'azure';
        expect(determineIndexFilePath()).toContain('public/index.html');
    });
    test('should throw exception when PRODUCTION_ENV is something else', () => {
        process.env.PRODUCTION_ENV = '';
        expect(determineIndexFilePath).toThrow();
    });
});

describe('test determineStaticFileFolder()', () => {
    test('should respond with correct folder when PRODUCTION_ENV is aws', () => {
        process.env.PRODUCTION_ENV = 'aws';
        expect(determineStaticFileFolder()).toContain('client/build');
    });
    test('should respond with correct folder when PRODUCTION_ENV is azure', () => {
        process.env.PRODUCTION_ENV = 'azure';
        expect(determineStaticFileFolder()).toContain('public');
    });
    test('should throw exception when PRODUCTION_ENV is something else', () => {
        process.env.PRODUCTION_ENV = '';
        expect(determineStaticFileFolder).toThrow();
    });
});

afterAll(() => {
    process.env.NODE_ENV = 'test';
});
