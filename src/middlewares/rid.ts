import { NextFunction, Request, Response } from 'express';
import { REMOTE_IP_HEADER, REQUEST_ID_HEADER } from '../lib';

export default (req: Request, res: Response, next: NextFunction) => {
  const remoteIp = req?.headers[REMOTE_IP_HEADER] as string | undefined;
  const ip = req.ip + (remoteIp ? `/${remoteIp}` : '');
  const url = req.url;
  const dt = Date.now();
  const rid = `"ip":"${ip}","url":"${url}","dt":"${dt}"`;
  req.headers[REQUEST_ID_HEADER] = rid;
  res.setHeader(REQUEST_ID_HEADER, rid);
  next();
};
