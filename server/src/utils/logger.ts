import winston from 'winston';

// A variable to create a log with the timestamp when the server starts
const logger: winston.Logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    transports: [new winston.transports.File({ filename: `./logs/${Date.now()}.log` })]
});

export default logger;
