const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const instructorAutocompleteRouter = require('./src/routes/instructorAutocomplete');
const internalErrorHandler = require('./src/middlewares/internalErrorHandler');
const invalidRouteHandler = require('./src/middlewares/invalidRouteHandler');
const rateLimiter = require('./src/middlewares/rateLimiter');   // Remove all rateLimiter occurrences when testing
const searchRouter = require('./src/routes/search');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/api/v1/search', rateLimiter, searchRouter);
app.use('/complete/instructors', rateLimiter, instructorAutocompleteRouter);

app.use(internalErrorHandler);
app.use(invalidRouteHandler);

module.exports = app;
