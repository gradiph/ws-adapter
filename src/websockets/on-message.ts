import axios, { AxiosRequestConfig } from 'axios';
import stringify from 'json-stringify-safe';
import { assign } from 'lodash';
import WebSocket from 'ws';
import { Client } from '../@types/client.d';
import logger from '../logger';
import sendMessage from './send-message';

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
    `Forwarding request from [${client.clientId}] to ${config.url}: ${message}`
  );
  logger.debug(`Sending axios request with config : `, config);
  const response = await axios(config);
  const respMesage = stringify(response.data);
  logger.info(
    `Forwarding response from ${config.url} to [${client.clientId}]: ${respMesage}`
  );
  sendMessage({
    ws,
    message: respMesage
  });
};
