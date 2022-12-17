import app from './app';
import logger from './utils/logger';

const PORT: number = (process.env.PORT !== undefined) ? parseInt(process.env.PORT) : 26997;

app.listen(PORT, () => logger.info(`Server is Running on Port #${PORT}.`));
