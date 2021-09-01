const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const instructorAutocompleteRouter = require('./src/routes/instructorAutocomplete');
const internalErrorHandler = require('./src/utils/internalErrorHandler');
const searchRouter = require('./src/routes/search');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/search', searchRouter);
app.use('/complete/instructors', instructorAutocompleteRouter);

app.use(internalErrorHandler);

module.exports = app;
