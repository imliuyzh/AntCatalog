const app = require('./app');
const logger = require('./src/utils/logger');

const port = 26997;

app.listen(port, () => {
    logger.info(`Server is Running on Port #${port}.`);
});
