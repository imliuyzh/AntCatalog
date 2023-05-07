import Transport from 'winston-transport';
import winston from 'winston';

const transport: Transport = new winston.transports.File({ filename: `./logs/${Date.now()}.log` });

// Create a log with the timestamp when the server starts
const logger: winston.Logger = winston.createLogger({
    exceptionHandlers: transport,
    format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
    rejectionHandlers: transport,
    transports: transport
});

export default logger;
