import { Express } from 'express';
import config from '../config';
import logger from '../logger';

const { APP_PORT } = config;

export default (app: Express) => {
  return app.listen(APP_PORT, () => {
    const message = `Server running at http://localhost:${APP_PORT}\n\n`;
    logger.info(message);
    if (process.send) {
      process.send(message);
    }
  });
};
