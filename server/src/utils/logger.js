const { createLogger, format, transports } = require('winston');
const { combine, prettyPrint, timestamp } = format;

const logger = createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.File({
            filename: `./logs/${Date.now()}.log`
        })
    ]
});

module.exports = logger;
