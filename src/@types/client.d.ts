import { AxiosRequestConfig } from 'axios';

export interface Client {
  clientId?: string;
  clientSecret?: string;
  ip?: string;
  remoteIp?: string;
  axiosConfig?: AxiosRequestConfig;
}
