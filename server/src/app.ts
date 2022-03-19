import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import courseRateLimiter from './middlewares/courseRateLimiter';   // Must comment out all occurrences during testing
import courseRouter from './routes/courseRouter';
import instructorRouter from './routes/instructorRouter';
import internalErrorHandler from './middlewares/internalErrorHandler';
import invalidRouteHandler from './middlewares/invalidRouteHandler';

const app: express.Application = express();

app.set('trust proxy', process.env.NODE_ENV === 'production');
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

app.use('/courses', courseRateLimiter, courseRouter);
app.use('/instructors', instructorRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
    app.get('*', (_: unknown, res: express.Response) => res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`)));
}

app.use(internalErrorHandler);
app.use(invalidRouteHandler);

export default app;
