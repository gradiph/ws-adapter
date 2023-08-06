import { HttpStatusCode } from 'axios';
import { Express, Request, Response } from 'express';
import stringify from 'json-stringify-safe';
import { authenticateHttp } from '../auth';
import { REQUEST_ID_HEADER } from '../lib';
import logger from '../logger';
import sendBroadcast from '../websockets/broadcast';
import broadcastAll from './broadcast-all';
import broadcastToChannel from './broadcast-to-channel';

export default (app: Express) => {
  broadcastAll(app);
  broadcastToChannel(app);
};

export const broadcast = ({
  req,
  res,
  receiverClientIds
}: {
  req: Request;
  res: Response;
  receiverClientIds: string[];
}) => {
  const rid = req.headers[REQUEST_ID_HEADER];
  logger.info(`[${rid}] REQUEST : ${stringify(req.body)}`);
  authenticateHttp(req, ({ err, client: senderClient }) => {
    if (err) {
      const message = err.message;
      logger.debug(`Authentication failed with message: ${message}`);
      const status = err.message.includes('401')
        ? 401
        : HttpStatusCode.BadRequest;
      res.status(status).send(message);
      return;
    }

    const message = req?.body?.message;
    const successCount = sendBroadcast({
      senderClient,
      receiverClientIds,
      message
    });
    logger.info(`[${rid}] RESPONSE : ${stringify({ successCount })}`);
    res.json({ successCount });
  });
};
