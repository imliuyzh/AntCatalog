const apicache = require('apicache');
const express = require('express');
const { query, validationResult } = require('express-validator');
const Fuse = require('fuse.js');

const loadInstructors = require('../utils/instructorList');
const logger = require('../utils/logger');

const cache = apicache.middleware;

const router = express.Router();
router.get(
    '/',
    query('name').default(''),
    query('name')
        .exists()
        .withMessage('Malformed Request Syntax.')
        .bail()
        .isString()
        .withMessage('Value Must Be a String.')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Value Must Not Be Empty.'),
    cache('30 seconds', (_, res) => res.statusCode === 200),
    async (req, res, next) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty() === false) {
                let errMsg = errors.array();
                logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`);
                return res
                    .status(422)
                    .json({
                        success: false,
                        info: errMsg
                    });
            }

            let instructorList = await loadInstructors();
            let fuse = new Fuse(instructorList, { minMatchCharLength: 3 });
            let matches = fuse.search(req.query.name, { limit: 5 }).map(match => match.item);
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(matches)}`);
            res.json({ success: true, matches });
        } catch (exception) {
            next(exception);
        }
    }
);

module.exports = router;
