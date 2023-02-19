import path from 'path';

/**
 * Generate the path to the index.html file.
 * @returns The full path where index.html is located at.
 */
function determineIndexFilePath(): string {
    switch (process.env.PRODUCTION_ENV) {
        case 'aws':
            return path.resolve(`${__dirname}/../../../client/build/index.html`);
        case 'azure':
            return path.resolve(`${__dirname}/../../public/index.html`);
        default:
            throw new Error('Unknown production environment.');
    }
}

/**
 * Generate the path to the front end assets folder.
 * @returns The full path where the front end assets are at.
 */
function determineStaticFileFolder(): string {
    switch (process.env.PRODUCTION_ENV) {
        case 'aws':
            return path.resolve(`${__dirname}/../../../client/build`);
        case 'azure':
            return path.resolve(`${__dirname}/../../public`);
        default:
            throw new Error('Unknown production environment.');
    }
}

export {
    determineIndexFilePath,
    determineStaticFileFolder
};
