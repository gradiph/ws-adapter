import express from 'express';
import { buildTime } from './build';
import logger from './logger';
import setMiddlewares from './middlewares';
import startServer from './server';
import setWebsockets from './websockets';

const app = express();
setMiddlewares(app);
app.get('/', (_, res) => {
  res.send(`API Version: ${process.env.npm_package_version} <br />
  Build time: ${buildTime}`);
});
const server = startServer(app);
setWebsockets(server);

process.on('message', (message: NodeJS.MessageListener) => {
  logger.info('process.on("message")', [message]);
});
