import { Express } from 'express';
import stringify from 'json-stringify-safe';
import { REQUEST_ID_HEADER } from '../lib';
import logger from '../logger';
import sendBroadcast from '../websockets/broadcast';

export default (app: Express) => {
  app.post('/broadcast', (req, res) => {
    const rid = req.headers[REQUEST_ID_HEADER];
    logger.info(`[${rid}] REQUEST : ${stringify(req.body)}`);
    const successCount = sendBroadcast(req.body);
    logger.info(`[${rid}] RESPONSE : ${stringify({ successCount })}`);
    res.json({ successCount });
  });
};
