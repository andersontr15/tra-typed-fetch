import { Headers } from 'node-fetch';
import { IRequest } from './interfaces';
declare const transformRequest: (request: IRequest) => IRequest;
declare const buildBaseHeaders: () => Headers;
export { buildBaseHeaders, transformRequest };
