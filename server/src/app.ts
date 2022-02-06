import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
//import path from 'path';     // Comment it out when doing local development

import instructorAutocompleteRouter from './routes/instructorAutocomplete';
import internalErrorHandler from './middlewares/internalErrorHandler';
import invalidRouteHandler from './middlewares/invalidRouteHandler';
import rateLimiter from './middlewares/rateLimiter';   // Comment out all rateLimiter occurrences when testing
import searchRouter from './routes/search';

const app: express.Application = express();

//app.set('trust proxy', true);     // Comment it out when doing local development
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: { scriptSrc: [`'self'`, `'unsafe-inline'`] }
    }
}));
//app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));   // Comment it out when doing local development

app.use('/api/search', rateLimiter, searchRouter);
app.use('/complete/instructors', instructorAutocompleteRouter);
//app.get('*', (_: unknown, res: express.Response) => res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`)));   // Comment it out when doing local development

app.use(internalErrorHandler);
app.use(invalidRouteHandler);

export default app;
