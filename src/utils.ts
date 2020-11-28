import { Headers } from 'node-fetch';
import { RequestMethod, RequestParams } from './enums';
import { IRequest } from './interfaces';

const transformRequest = (request: IRequest): IRequest => {
  const transformedRequest = { ...request };
  if (transformedRequest.requestMethod !== RequestMethod.Get) {
    Object.defineProperty(transformedRequest, RequestParams.Body, {
      value: JSON.stringify(transformedRequest.payload),
      writable: false,
    });
  }
  buildBaseHeaders().forEach((value, name) =>
    transformedRequest.headers?.append(value, name)
  );
  return transformedRequest;
};

const buildBaseHeaders = () =>
  new Headers({
    'content-type': 'application/json',
  });

export { buildBaseHeaders, transformRequest };
