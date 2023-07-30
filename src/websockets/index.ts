import { Server } from 'http';
import { forEach } from 'lodash';
import queryString from 'qs';
import WebSocket from 'ws';
import logger from '../logger';

export default async (server: Server) => {
  const wss = new WebSocket.Server({
    noServer: true,
    path: '/websockets'
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit('connection', websocket, request);
    });
  });

  const clients: WebSocket[] = [];
  wss.on('connection', (client, request) => {
    const split = request?.url;
    const params = split?.split('?')['params'];
    const connectionParams = queryString.parse(params);

    clients.push(client);

    // NOTE: connectParams are not used here but good to understand how to get
    // to them if you need to pass data with the connection to identify it (e.g., a userId).
    logger.trace(connectionParams);

    client.on('message', (message, isBinary) => {
      const parsedMessage = JSON.parse(
        (isBinary ? message : message.toString()) as string
      );
      logger.trace(parsedMessage);
      client.send(
        JSON.stringify({ message: 'There be gold in them thar hills.' })
      );

      forEach(clients, (c) => {
        c.send(`Client [${client}] send message [${message}]`);
      });
    });
  });

  return wss;
};
