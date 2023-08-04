import { IncomingMessage } from 'http';
import { AuthenticateCallback } from '../@types/auth.d';
import { Client } from '../@types/client.d';
import { UNAUTHORIZED_MESSAGE, getQs } from '../lib';
import isClientValidated from './is-client-validated';

export default (req: IncomingMessage, cb: AuthenticateCallback) => {
  const params = getQs(req);

  const client: Client = {
    clientId: params?.clientId as string,
    clientSecret: params?.clientSecret as string,
    ip: req.socket.remoteAddress,
    remoteIp: req?.headers['x-forwarded-for'] as string | undefined
  };

  if (isClientValidated(client)) {
    cb({ client });
  } else {
    const err = new Error(UNAUTHORIZED_MESSAGE);
    cb({ err });
  }
};
