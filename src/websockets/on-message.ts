import axios, { AxiosRequestConfig } from 'axios';
import stringify from 'json-stringify-safe';
import { assign } from 'lodash';
import WebSocket from 'ws';
import { Client } from '../@types/client.d';
import logger from '../logger';
import { clientsHolder } from './clients-holder';

export default async ({
  ws,
  client,
  message
}: {
  ws: WebSocket.WebSocket;
  client: Client;
  message: string;
}): Promise<void> => {
  const config: AxiosRequestConfig = assign(client.axiosConfig, {
    data: message
  });
  logger.info(
    `Forwarding message from [${client.clientId}] to ${config.url}: ${message}`
  );
  logger.debug(`Sending axios request with config : `, config);
  const response = await axios(config);
  if (ws.readyState === WebSocket.OPEN) {
    logger.info(
      `Forwarding response from ${config.url} to [${
        client.clientId
      }]: ${stringify(response.data)}`
    );
    ws.send(stringify(response.data));
  } else {
    clientsHolder.remove({ ws });
  }
};
