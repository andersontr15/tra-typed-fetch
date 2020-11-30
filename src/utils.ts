import { destroy, get, patch, post, put } from '.';
import { RequestMethod, RequestParams } from './enums';
import {
  IHttpClientConfig,
  IRequest,
  IRequestConfiguration,
  IRequestRequired,
  IRequestRequiredGet,
} from './interfaces';

const transformRequest = (request: IRequest): IRequest => {
  const transformedRequest = { ...request, method: request.requestMethod };
  if (transformedRequest.requestMethod !== RequestMethod.Get) {
    Object.defineProperty(transformedRequest, RequestParams.Body, {
      value: JSON.stringify(transformedRequest.payload),
      writable: true,
    });
  }
  if (!transformedRequest.headers) {
    transformedRequest.headers = buildBaseHeaders();
  } else {
    buildBaseHeaders().forEach((value, key) =>
      transformedRequest.headers?.append(key, value)
    );
  }
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
    'Content-Type': 'application/json',
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

const httpClientCache: Map<string, IHttpClientConfig> = new Map();

export {
  buildBaseHeaders,
  httpClientCache,
  mergeConfigs,
  requestMap,
  transformRequest,
};
