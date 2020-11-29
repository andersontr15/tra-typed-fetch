import { Request, Response } from 'node-fetch';
import { RequestMethod } from './enums';
export interface IResponse<T> extends Partial<Response> {
  data: T | any;
  headers: Response['headers'];
  status: Response['status'];
}
export interface IRequest extends Partial<Request> {
  headers?: Request['headers'];
  payload?: object;
  requestMethod: RequestMethod;
  url: Request['url'];
}
export declare type IRequestRequired = Pick<IRequest, 'url' | 'payload'>;
export declare type IRequestRequiredGet = Pick<IRequest, 'url'>;
