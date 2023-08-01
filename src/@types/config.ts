import { LogLevel } from 'bunyan';
import { Client } from './client';

/**
 * Configuration data structure
 * @exports
 * @interface Config
 */
export interface Config {
  APP_NAME: string;
  APP_PORT: number;
  CLIENTS: Client[];
  CORS_ALLOWED_URLS: string[];
  LOG_LEVEL: LogLevel;
}
