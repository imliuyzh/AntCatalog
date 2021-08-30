const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const instructorAutocompleteRouter = require('./src/routes/instructorAutocomplete');
const searchRouter = require('./src/routes/search');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/v1/search', searchRouter);
app.use('/complete/instructors', instructorAutocompleteRouter);

module.exports = app;
