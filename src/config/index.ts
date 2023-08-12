import rc from 'rc';
import { Config } from '../@types/config.d';

const APP_NAME = process.env.APP_NAME || 'ws-adapter';

const configDefault: Config = {
  APP_NAME,
  APP_PORT: 5001,
  CLIENTS: [],
  CORS_ALLOWED_URLS: ['*'],
  LOG_LEVEL: 'trace'
};

/**
 * Read RC Configuration file
 * Option: dev or non-dev source by NODE_ENV
 * @returns {Config}
 */
function readRcFile(): Config {
  const configSource = APP_NAME;
  const config = rc<Config>(configSource, configDefault);
  /* tslint:disable-next-line */
  return config;
}

export default readRcFile();
