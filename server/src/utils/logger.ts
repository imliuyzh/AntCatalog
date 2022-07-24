import winston from 'winston';

const logger: winston.Logger = winston.createLogger({   // A variable to create a log with the timestamp when the server starts
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    transports: [new winston.transports.File({ filename: `./logs/${Date.now()}.log` })]
});

export default logger;
