import { Request } from 'express';
import { AuthenticateCallback } from '../@types/auth.d';
import { REMOTE_IP_HEADER } from '../lib';
import authenticate from './authenticate';

export default (req: Request, cb: AuthenticateCallback) => {
  const params = req?.body;
  const clientId = params?.senderClientId as string;
  const clientSecret = params?.senderClientSecret as string;

  authenticate({ clientId, clientSecret }, ({ err, client }) => {
    if (err) {
      cb({ err });
      return;
    }

    client.ip = req.ip;
    client.remoteIp = req?.headers[REMOTE_IP_HEADER] as string | undefined;

    cb({ client });
  });
};
