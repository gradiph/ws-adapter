import { findIndex } from 'lodash';
import { Client } from '../@types/client.d';
import config from '../config';

const { CLIENTS } = config;

const isRegisteredClient = (client: Client) =>
  findIndex(
    CLIENTS,
    (o) =>
      o.clientId === client.clientId && o.clientSecret === client.clientSecret
  ) >= 0;

export default (client: Client): boolean => isRegisteredClient(client);
