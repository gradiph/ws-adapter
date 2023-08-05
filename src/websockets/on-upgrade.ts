import { IncomingMessage } from 'http';
import internal from 'stream';
import WebSocket from 'ws';
import { authenticate } from '../auth';
import logger from '../logger';

export default (
  wss: WebSocket.Server,
  req: IncomingMessage,
  socket: internal.Duplex,
  head: Buffer
) => {
  socket.on('error', (err) => {
    logger.error('socket error', socket, err);
  });

  authenticate(req, ({ err, client }) => {
    if (err) {
      const message = err.message;
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
};
