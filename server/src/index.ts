import app from './app';
import logger from './utils/logger';

const PORT: number = (process.env.PORT !== undefined) ? parseInt(process.env.PORT) : 26997;

const server = app.listen(PORT, () => logger.info(`Server is Running on Port #${PORT}.`));

process.on('SIGTERM', () => server.close(() => logger.info(`Server is Closed.`)));
