import compression from 'compression';
import { Express } from 'express';
import cors from './cors';

export default (app: Express) => {
  app.use(cors);
  app.use(compression());
};
