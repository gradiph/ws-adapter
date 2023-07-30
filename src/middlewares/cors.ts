import cors from 'cors';
import { includes } from 'lodash';
import config from '../config';

const { CORS_ALLOWED_URLS } = config;

export const configuration = {
  credentials: true,
  origin: function (origin, callback) {
    if (
      includes(CORS_ALLOWED_URLS, '*') ||
      !origin ||
      includes(CORS_ALLOWED_URLS, origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not permitted by CORS policy.`));
    }
  }
};

export default (req, res, next) => {
  return cors(configuration)(req, res, next);
};
