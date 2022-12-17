import app from './app';
import logger from './utils/logger';

const port: number = parseInt(process.env.PORT ?? "26997");

app.listen(port, () => logger.info(`Server is Running on Port #${port}.`));
