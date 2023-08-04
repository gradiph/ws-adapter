import { IncomingMessage, Server } from 'http';
import stringify from 'json-stringify-safe';
import WebSocket from 'ws';
import { Client } from '../@types/client.d';
import { authenticate } from '../auth';
import { UNAUTHORIZED_MESSAGE } from '../lib';
import logger from '../logger';
import { clientsHolder } from './clients-holder';

export default async (server: Server) => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });
  logger.trace('[init] clientsHolder : ', clientsHolder);

  wss.on(
    'connection',
    (ws: WebSocket.WebSocket, req: IncomingMessage, client: Client) => {
      // logger.trace('[onConnection] clients : ', wss.clients);
      // logger.trace('[onConnection] ws : ', ws);
      // logger.trace('[onConnection] req : ', req);
      // logger.trace('[onConnection] client : ', client);
      const { clientId } = client;
      clientsHolder.add({ clientId, ws });
      logger.trace(
        '[after onConnection] clientsHolder : ',
        stringify(clientsHolder)
      );
    }
  );

  server.on('upgrade', (req, socket, head) => {
    socket.on('error', (err) => {
      logger.error('socket error', socket, err);
    });

    authenticate(req, ({ err, client }) => {
      if (err || !client) {
        const message = err?.message || UNAUTHORIZED_MESSAGE;
        logger.debug(
          `Socket from ${req.socket.remoteAddress} to ${req.url} is rejected with cause ${message}`
        );
        socket.write(message);
        socket.destroy();
        return;
      }

      socket.removeListener('error', (err) => {
        logger.error('socket error', socket, err);
      });

      wss.handleUpgrade(req, socket, head, function done(ws) {
        wss.emit('connection', ws, req, client);
      });
    });
  });

  return wss;
};
