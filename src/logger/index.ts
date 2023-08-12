import { createLogger } from 'bunyan';
import config from '../config';

const { APP_NAME, LOG_LEVEL } = config;

export default createLogger({
  name: APP_NAME,
  level: LOG_LEVEL
});
