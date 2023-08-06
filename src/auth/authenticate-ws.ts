import { IncomingMessage } from 'http';
import stringify from 'json-stringify-safe';
import { AuthenticateCallback } from '../@types/auth.d';
import { INTERNAL_SERVER_ERROR, REMOTE_IP_HEADER, getQs } from '../lib';
import logger from '../logger';
import authenticate from './authenticate';

export default (req: IncomingMessage, cb: AuthenticateCallback) => {
  const params = getQs(req);
  const clientId = params?.clientId as string;
  const clientSecret = params?.clientSecret as string;

  authenticate({ clientId, clientSecret }, ({ err, client }) => {
    if (err) {
      cb({ err });
      return;
    }

    if (client.axiosConfig === undefined) {
      logger.error(`Axios configuration for ${stringify(client)} is not set.`);
      const err = new Error(INTERNAL_SERVER_ERROR);
      cb({ err });
      return;
    }

    client.ip = req.socket.remoteAddress;
    client.remoteIp = req?.headers[REMOTE_IP_HEADER] as string | undefined;

    cb({ client });
  });
};
