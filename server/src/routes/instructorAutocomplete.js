const express = require('express');
const { query, validationResult } = require('express-validator');
const Fuse = require('fuse.js')

const loadInstructors = require('../utils/instructorList');
const logger = require('../utils/logger');

let router = express.Router();
router.get(
    '/', 
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
    async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty() === false) {
            let errMsg = errors.array();
            logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(errMsg)}`)
            return res
                .status(400)
                .json({
                    success: false,
                    info: errMsg
                });
        }
        
        let instructorList = await loadInstructors();
        let fuse = new Fuse(instructorList, { minMatchCharLength: 3 });
        let matches = fuse.search(req.query.name, { limit: 5 });
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(matches)}`)
        res.json({ success: true, matches });
    }
);

module.exports = router;