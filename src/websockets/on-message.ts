import { forEach } from 'lodash';
import WebSocket from 'ws';
import logger from '../logger';

export default ({
  clients,
  client,
  message,
  isBinary
}: {
  clients: WebSocket[];
  client: WebSocket;
  message: WebSocket.RawData;
  isBinary: boolean;
}) => {
  const parsedMessage = JSON.parse(
    (isBinary ? message : message.toString()) as string
  );
  logger.trace({ parsedMessage });
  client.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));

  forEach(clients, (c) => {
    c.send(`A client send message [${message}]`);
  });
};
