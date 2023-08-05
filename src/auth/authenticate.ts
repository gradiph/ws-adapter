import { IncomingMessage } from 'http';
import stringify from 'json-stringify-safe';
import { find } from 'lodash';
import { AuthenticateCallback } from '../@types/auth.d';
import { Client } from '../@types/client.d';
import config from '../config';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED_MESSAGE, getQs } from '../lib';
import logger from '../logger';

const { CLIENTS } = config;

export default (req: IncomingMessage, cb: AuthenticateCallback) => {
  const params = getQs(req);
  const clientId = params?.clientId as string;
  const clientSecret = params?.clientSecret as string;

  const client: Client = find(CLIENTS, { clientId, clientSecret });
  if (!client) {
    const err = new Error(UNAUTHORIZED_MESSAGE);
    cb({ err });
  }

  if (client.axiosConfig === undefined) {
    logger.error(`Axios configuration for ${stringify(client)} is not set.`);
    const err = new Error(INTERNAL_SERVER_ERROR);
    cb({ err });
  }

  client.ip = req.socket.remoteAddress;
  client.remoteIp = req?.headers['x-forwarded-for'] as string | undefined;

  cb({ client });
};
