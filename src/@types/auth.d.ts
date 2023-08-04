import { Client } from './client.d';

export interface AuthenticateCallbackArgs {
  err?: Error;
  client?: Client;
}

const defaultAuthenticateCallbackArgs: AuthenticateCallbackArgs = {
  err: undefined,
  client: undefined
};

export interface AuthenticateCallback {
  (args: AuthenticateCallbackArgs = defaultAuthenticateCallbackArgs): void;
}
