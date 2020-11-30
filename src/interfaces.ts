import { Request, Response } from 'node-fetch';
import { RequestMethod } from './enums';

export interface IResponse<T> {
  data: T;
  headers: Response['headers'];
  status: Response['status'];
}

export interface IRequest extends Partial<Request> {
  baseUrl?: string;
  headers?: Request['headers'];
  payload?: object;
  requestMethod: RequestMethod;
  url: Request['url'];
}

export type IRequestRequired = Pick<IRequest, 'url' | 'payload' | 'headers'>;

export type IRequestRequiredGet = Pick<IRequest, 'url' | 'headers'>;

export interface IRequestConfiguration {
  baseUrl?: string;
  defaultHeaders?: Request['headers'];
}

export interface IHttpClientConfigOptions {
  useCachedConfig: boolean;
}
