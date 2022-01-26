import app from './app';
import logger from './utils/logger';

const PORT: number = 26997;

app.listen(PORT, () => logger.info(`Server is Running on Port #${PORT}.`));
