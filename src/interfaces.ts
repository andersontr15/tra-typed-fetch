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

export interface IHttpClientConfig {
  baseConfiguration: IRequestConfiguration;
  destroy: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
  get: <T>(params: IRequestRequiredGet) => Promise<IResponse<T>>;
  patch: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
  post: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
  put: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
}
