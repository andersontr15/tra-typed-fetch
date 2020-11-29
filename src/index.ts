import fetch, { FetchError, Headers } from 'node-fetch';
import { RequestMethod } from './enums';
import {
  IRequest,
  IRequestConfiguration,
  IRequestRequired,
  IRequestRequiredGet,
  IResponse,
} from './interfaces';
import { mergeConfigs, requestMap, transformRequest } from './utils';

const request = async <T>(params: IRequest): Promise<IResponse<T>> => {
  const request = transformRequest(params);

  try {
    const response = await fetch(request.url, request);

    if (!response.ok) {
      throw new FetchError(
        response.statusText,
        `${request.method}-${request.url}`
      );
    }

    const json = await response.json();

    const formattedResponse: IResponse<T> = {
      headers: response.headers,
      data: json,
      status: response.status,
    };

    return Promise.resolve(formattedResponse);
  } catch (error) {
    return Promise.reject(error);
  }
};

const get = async <T>(params: IRequestRequiredGet) =>
  request<T>({
    ...params,
    requestMethod: RequestMethod.Get,
  });

const post = async <T>(params: IRequestRequired) =>
  request<T>({
    ...params,
    requestMethod: RequestMethod.Post,
  });

const patch = async <T>(params: IRequestRequired) =>
  request<T>({
    ...params,
    requestMethod: RequestMethod.Patch,
  });

const put = async <T>(params: IRequestRequired) =>
  request<T>({
    ...params,
    requestMethod: RequestMethod.Put,
  });

const destroy = async <T>(params: IRequestRequired) =>
  request<T>({
    ...params,
    requestMethod: RequestMethod.Destroy,
  });

const createHttpClient = (
  baseConfiguration: Required<IRequestConfiguration>
) => {
  const modifiedRequestWithBaseConfiguration = (
    requestMethod: RequestMethod
  ) => {
    switch (requestMethod) {
      case RequestMethod.Get:
        return async <T>(params: IRequestRequiredGet) =>
          requestMap[requestMethod]<T>(mergeConfigs(baseConfiguration, params));
      case RequestMethod.Destroy:
      case RequestMethod.Patch:
      case RequestMethod.Post:
      case RequestMethod.Put:
        return async <T>(params: IRequestRequired) =>
          requestMap[requestMethod]<T>(mergeConfigs(baseConfiguration, params));
    }
  };

  return {
    baseConfiguration,
    destroy: modifiedRequestWithBaseConfiguration(RequestMethod.Destroy),
    get: modifiedRequestWithBaseConfiguration(RequestMethod.Get),
    patch: modifiedRequestWithBaseConfiguration(RequestMethod.Patch),
    post: modifiedRequestWithBaseConfiguration(RequestMethod.Post),
    put: modifiedRequestWithBaseConfiguration(RequestMethod.Put),
  };
};

export { createHttpClient, get, destroy, patch, post, put };
