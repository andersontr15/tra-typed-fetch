import { Headers } from 'node-fetch';
import { get, patch, post, put, destroy } from '.';
import { RequestMethod, RequestParams } from './enums';
import {
  IRequest,
  IRequestConfiguration,
  IRequestRequired,
  IRequestRequiredGet,
} from './interfaces';

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

const requestMap = {
  [RequestMethod.Get]: get,
  [RequestMethod.Patch]: patch,
  [RequestMethod.Post]: post,
  [RequestMethod.Put]: put,
  [RequestMethod.Destroy]: destroy,
};

const buildBaseHeaders = () =>
  new Headers({
    'content-type': 'application/json',
  });

const mergeConfigs = (
  baseConfiguration: IRequestConfiguration,
  params: IRequestRequiredGet | IRequestRequired
) => {
  const headers = new Headers();
  if (params.headers) {
    params.headers.forEach((value, name) => headers.append(name, value));
  }
  if (baseConfiguration.defaultHeaders) {
    baseConfiguration.defaultHeaders.forEach((value, name) =>
      headers.append(name, value)
    );
  }
  let config = {
    headers,
    url: `${baseConfiguration.baseUrl}${params.url}`,
  };
  if ('payload' in params) {
    return {
      ...config,
      payload: params.payload,
    };
  }
  return config;
};

export { buildBaseHeaders, mergeConfigs, requestMap, transformRequest };
