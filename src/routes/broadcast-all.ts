import { Express } from 'express';
import { clientsHolder } from '../websockets/clients-holder';
import { broadcast } from './broadcast';

export default (app: Express) => {
  app.post('/broadcast/all', (req, res) => {
    const receiverClientIds = clientsHolder.all();
    broadcast({ req, res, receiverClientIds });
  });
};
