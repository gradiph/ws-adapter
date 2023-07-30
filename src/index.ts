import express from 'express';
import config from './config';
import logger from './logger';
import middlewares from './middlewares';
import websockets from './websockets';

const app = express();
const { APP_PORT } = config;

middlewares(app);

app.get('/', (_, res) => {
  res.send('API version 31/07/2023.');
});

const server = app.listen(APP_PORT, () => {
  const message = `Server running at http://localhost:${APP_PORT}\n\n`;
  logger.trace(message);
  if (process.send) {
    process.send(message);
  }
});

websockets(server);

process.on('message', (message: NodeJS.MessageListener) => {
  logger.info('process.on("message")', [message]);
});
