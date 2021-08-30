const express = require('express');
const { query, validationResult } = require('express-validator');
const Fuse = require('fuse.js')
const sqlite3 = require('sqlite3').verbose();
const logger = require('../utils/logger');

let router = express.Router();
router.get(
    '/', 
    query('name')
        .exists()
        .withMessage('Malformed Request Syntax.')
        .isString()
        .withMessage('Value Must be a String.')
        .trim()
        .notEmpty()
        .withMessage('Value Must Not be Empty.'),
    (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty() === false) {
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${errors.array()}`)
            let errMsg = errors.array();
            return res
                .status(400)
                .json({
                    success: false,
                    info: errMsg
                });
        }
        
        let instructorList = [];
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
        
        let fuse = new Fuse(instructorList, { minMatchCharLength: 3 });
        let matches = fuse.search(req.query.name, { limit: 5 });
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${matches}`)
        res.json({ success: true, matches });
    }
);

module.exports = router;
