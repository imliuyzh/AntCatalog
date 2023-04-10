import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import courseRouter from './routes/courseRouter';
import { determineIndexFilePath, determineStaticFileFolder } from './utils/staticFilesPathSetter';
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
        directives: { scriptSrc: [`'self'`, `'unsafe-inline'`] },
        useDefaults: true
    }
}));

app.use('/courses', courseRouter);
app.use('/instructors', instructorRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(determineStaticFileFolder()));
    app.get('*', (_: unknown, res: express.Response) => res.sendFile(determineIndexFilePath()));
}

app.use(invalidRouteHandler);
app.use(internalErrorHandler);

export default app;
