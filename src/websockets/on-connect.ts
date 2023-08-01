import { IncomingMessage } from 'http';
import WebSocket from 'ws';
import { Client } from '../@types';
import { validateAuth } from '../auth';
import { SOCKET_CODE_UNAUTHORIZED, getQs } from '../lib';
import logger from '../logger';
import onMessage from './on-message';

export default ({
  clients,
  client,
  request
}: {
  clients: WebSocket[];
  client: WebSocket;
  request: IncomingMessage;
}) => {
  const params = getQs(request);
  logger.info('Incoming request: ', params);

  const clientData: Client = {
    clientId: params?.clientId as string,
    clientSecret: params?.clientSecret as string
  };
  logger.trace('Validating client: ', clientData);

  if (!validateAuth(clientData)) {
    logger.info('Client % is unauthorized.', clientData);
    client.close(SOCKET_CODE_UNAUTHORIZED, 'Unauthorized');
  } else {
    clients.push(client);

    client.on('message', (message, isBinary) => {
      onMessage({ clients, client, message, isBinary });
    });
  }
};
