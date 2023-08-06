import compression from 'compression';
import express, { Express } from 'express';
import cors from './cors';
import rid from './rid';

export default (app: Express) => {
  app.use(cors);
  app.use(compression());
  app.use(express.json());
  app.use(rid);
};
