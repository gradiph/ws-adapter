import { Express } from 'express';
import { broadcast } from './broadcast';

export default (app: Express) => {
  app.post('/broadcast/channel', (req, res) => {
    const receiverClientIds = req?.body?.receiverClientIds;
    broadcast({ req, res, receiverClientIds });
  });
};
