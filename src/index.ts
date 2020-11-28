import fetch, { FetchError } from 'node-fetch';
import { RequestMethod } from './enums';
import {
  IRequest,
  IRequestRequired,
  IRequestRequiredGet,
  IResponse,
} from './interfaces';
import { transformRequest } from './utils';

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

export { get, destroy, patch, post, put };
