import { Express } from 'express';
import registerApiInformation from './api-information';
import registerBroadcast from './broadcast';

export default (app: Express) => {
  registerApiInformation(app);
  registerBroadcast(app);
};
