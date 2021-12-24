const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const instructorAutocompleteRouter = require('./src/routes/instructorAutocomplete');
const internalErrorHandler = require('./src/middlewares/internalErrorHandler');
const invalidRouteHandler = require('./src/middlewares/invalidRouteHandler');
const rateLimiter = require('./src/middlewares/rateLimiter');   // Comment out all rateLimiter occurrences when testing
const searchRouter = require('./src/routes/search');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
//app.use(express.static(path.join(__dirname, '..', 'client', 'build')));   // Comment it out when doing local development

app.use('/api/v1/search', rateLimiter, searchRouter);
app.use('/complete/instructors', instructorAutocompleteRouter);
//app.get('*', (_, res) => res.sendFile(path.resolve(`${__dirname}/../client/build/index.html`)));   // Comment it out when doing local development

app.use(internalErrorHandler);
app.use(invalidRouteHandler);

module.exports = app;
