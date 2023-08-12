import { readFileSync } from 'fs';
import path from 'path';
import { Express } from 'express';
import logger from '../logger';

const apiInfo = (): string => {
  const filePath = path.join(__dirname, '../../api-info.txt');
  try {
    return readFileSync(filePath, 'utf-8').toString();
  } catch (e) {
    logger.trace('error read build-time', e);
    return '';
  }
};

export default (app: Express) => {
  app.get('/', (_, res) => {
    res.send(apiInfo());
  });
};
