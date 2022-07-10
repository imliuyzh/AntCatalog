import winston from 'winston';

const { combine, prettyPrint, timestamp } = winston.format;

// A variable to create a log with the timestamp when the server starts
const logger: winston.Logger = winston.createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [new winston.transports.File({ filename: `./logs/${Date.now()}.log` })],
});

export default logger;
