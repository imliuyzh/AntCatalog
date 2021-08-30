const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const instructorAutocompleteRouter = require('./src/routes/instructorAutocomplete');
const logger = require('./src/utils/logger');
const searchRouter = require('./src/routes/search');

const app = express();
const port = 26997; // Assign a specific port for the ease of deployment

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/search', searchRouter);
app.use('/complete/instructor', instructorAutocompleteRouter);

app.listen(port, () => {
    logger.info(`Server Running on Port #${port}`);
});
