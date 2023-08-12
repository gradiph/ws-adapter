import { IncomingMessage } from 'http';
import stringify from 'json-stringify-safe';
import WebSocket from 'ws';
import { Client } from '../@types/client.d';
import { UNPROCESSABLE_CONTENT } from '../lib';
import logger from '../logger';
import { clientsHolder } from './clients-holder';
import onMessage from './on-message';

export default (
  ws: WebSocket.WebSocket,
  _: IncomingMessage,
  client: Client
): void => {
  const { clientId } = client;
  clientsHolder.add({ clientId, ws });
  logger.trace(
    '[after onConnection] clientsHolder : ',
    stringify(clientsHolder)
  );

  // ws.on('message', onMessage);
  ws.on('message', function (data, isBinary) {
    if (isBinary) {
      const message = UNPROCESSABLE_CONTENT;
      logger.debug(
        `Message from [${client.clientId}] is dismissed with cause ${message}`
      );
      ws.send(message);
      return;
    }

    const message = data.toString();
    onMessage({
      ws: this,
      client,
      message
    });
  });
};
