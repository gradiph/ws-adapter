import { find } from 'lodash';
import { AuthenticateCallback } from '../@types/auth.d';
import { Client } from '../@types/client.d';
import config from '../config';
import { UNAUTHORIZED_MESSAGE } from '../lib';

const { CLIENTS } = config;

export default (
  {
    clientId,
    clientSecret
  }: {
    clientId: string;
    clientSecret: string;
  },
  cb: AuthenticateCallback
) => {
  const client: Client = find(CLIENTS, { clientId, clientSecret });
  if (!client) {
    const err = new Error(UNAUTHORIZED_MESSAGE);
    cb({ err });
    return;
  }

  cb({ client });
};
