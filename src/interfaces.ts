import { Request, Response } from 'node-fetch';
import { RequestMethod } from './enums';

export interface IResponse<T> {
  data: T;
  headers: Response['headers'];
  status: Response['status'];
}

export interface IRequest extends Partial<Request> {
  headers?: Request['headers'];
  payload?: object;
  requestMethod: RequestMethod;
  url: Request['url'];
}

export type IRequestRequired = Pick<IRequest, 'url' | 'payload'>;

export type IRequestRequiredGet = Pick<IRequestRequired, 'url'>;
