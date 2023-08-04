import { Express } from 'express';

export default (app: Express) => {
  app.get('/', (_, res) => {
    res.send(`API Version: ${process.env.npm_package_version} <br />
    Build time: ${process.env.BUILD_TIME || new Date()}`);
  });
};
