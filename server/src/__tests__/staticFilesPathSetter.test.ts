import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { determineIndexFilePath, determineStaticFileFolder } from '../utils/staticFilesPathSetter'; 

beforeAll(() => {
    process.env.NODE_ENV = 'production';
});

describe('determineIndexFilePath() tests', () => {
    test('should respond with correct path when PRODUCTION_ENV is aws', () => {
        process.env.PRODUCTION_ENV = 'aws';
        expect(determineIndexFilePath()).toContain('client/build/index.html');
    });
    test('should respond with correct path when PRODUCTION_ENV is azure', () => {
        process.env.PRODUCTION_ENV = 'azure';
        expect(determineIndexFilePath()).toContain('public/index.html');
    });
    test('should throw exception when PRODUCTION_ENV is something else 1', () => {
        process.env.PRODUCTION_ENV = '';
        expect(determineIndexFilePath).toThrow();
    });
    test('should throw exception when PRODUCTION_ENV is something else 2', () => {
        process.env.PRODUCTION_ENV = undefined;
        expect(determineIndexFilePath).toThrow();
    });
    test('should throw exception when PRODUCTION_ENV is something else 3', () => {
        process.env.PRODUCTION_ENV = 'microsoft azure';
        expect(determineIndexFilePath).toThrow();
    });
});

describe('determineStaticFileFolder() tests', () => {
    test('should respond with correct folder when PRODUCTION_ENV is aws', () => {
        process.env.PRODUCTION_ENV = 'aws';
        expect(determineStaticFileFolder()).toContain('client/build');
    });
    test('should respond with correct folder when PRODUCTION_ENV is azure', () => {
        process.env.PRODUCTION_ENV = 'azure';
        expect(determineStaticFileFolder()).toContain('public');
    });
    test('should throw exception when PRODUCTION_ENV is something else 1', () => {
        process.env.PRODUCTION_ENV = '';
        expect(determineStaticFileFolder).toThrow();
    });
    test('should throw exception when PRODUCTION_ENV is something else 2', () => {
        process.env.PRODUCTION_ENV = undefined;
        expect(determineIndexFilePath).toThrow();
    });
    test('should throw exception when PRODUCTION_ENV is something else 3', () => {
        process.env.PRODUCTION_ENV = 'microsoft azure';
        expect(determineIndexFilePath).toThrow();
    });
});

afterAll(() => {
    process.env.NODE_ENV = 'test';
});
