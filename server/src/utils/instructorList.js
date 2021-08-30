const sqlite3 = require('sqlite3').verbose();
const logger = require('./logger');

const instructorList = [];

function loadInstructors() {
    if (instructorList.length === 0) {
        let db = new sqlite3.Database(
            './src/db/data.db', 
            sqlite3.OPEN_READONLY, 
            err => {
                if (err !== null) {
                    logger.error(err.message);
                }
                logger.info('Established a Connection to the Database Successfully.');
            }
        );

        db.serialize(() => {
            logger.info(`Begin to Retrieve All the Instructors' Name...`);
            db.each('SELECT DISTINCT name FROM instructor', (err, row) => {
                if (err !== null) {
                    logger.error(err.message);
                }
                instructorList.push(row.name);
            });
            logger.info(`Finished Retrieving All the Instructors' Name.`);
        });

        db.close(err => {
            if (err !== null) {
                logger.warn(err.message);
            }
            logger.info('Closed the Connection to the Database Successfully.');
        });
    }
    return instructorList;
}

module.exports = loadInstructors;
