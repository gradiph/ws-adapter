import { Express } from 'express';
import { buildTime } from '../build';

export default (app: Express) => {
  app.get('/', (_, res) => {
    res.send(`API Version: ${process.env.npm_package_version} <br />
    Build time: ${buildTime}`);
  });
};
