import { IncomingMessage } from 'http';
import qs, { ParsedQs } from 'qs';

export default (request: IncomingMessage): ParsedQs => {
  const url = request?.url;
  const split = url?.split('?');
  const params = split[1];
  return qs.parse(params);
};
