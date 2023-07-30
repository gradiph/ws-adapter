import { LogLevel } from 'bunyan';
import rc from 'rc';

/**
 * Configuration data structure
 * @exports
 * @interface Config
 */
export interface Config {
  APP_NAME: string;
  APP_PORT: number;
  CORS_ALLOWED_URLS: string[];
  LOG_LEVEL: LogLevel;
}

export const configDefault: Config = {
  APP_NAME: 'ws-adapter',
  APP_PORT: 5001,
  CORS_ALLOWED_URLS: ['*'],
  LOG_LEVEL: 'trace'
};

/**
 * Read RC Configuration file
 * Option: dev or non-dev source by NODE_ENV
 * @returns {Config}
 */
function readRcFile(): Config {
  const configSource = process.env.APP_NAME || 'ws-adapter';
  const config = rc<Config>(configSource, configDefault);
  /* tslint:disable-next-line */
  return config;
}

export default readRcFile();
