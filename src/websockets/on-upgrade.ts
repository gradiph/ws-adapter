import { IncomingMessage } from 'http';
import internal from 'stream';
import WebSocket from 'ws';
import { authenticateWs } from '../auth';
import logger from '../logger';

export default (
  wss: WebSocket.Server,
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer
) => {
  authenticateWs(req, ({ err, client }) => {
    if (err) {
      const message = err.message;
      logger.debug(
        `Socket from ${req.socket.remoteAddress} to ${req.url} is rejected with cause ${message}`
      );
      socket.write(message);
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, function done(ws) {
      wss.emit('connection', ws, req, client);
    });
  });
};
