import express from 'express';
import logger from './logger';
import setMiddlewares from './middlewares';
import registerRoutes from './routes';
import startServer from './server';
import setWebsockets from './websockets';

const app = express();
setMiddlewares(app);
registerRoutes(app);
const server = startServer(app);
setWebsockets(server);

process.on('message', (message: NodeJS.MessageListener) => {
  logger.info('process.on("message")', [message]);
});
