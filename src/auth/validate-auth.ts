import { includes, size } from 'lodash';
import { Client } from '../@types';
import config from '../config';

const { CLIENTS } = config;

const emptyClients = () => size(CLIENTS) === 0;
const registeredClient = (client: Client) => includes(CLIENTS, client);

export default (client: Client): boolean =>
  emptyClients() || registeredClient(client);
