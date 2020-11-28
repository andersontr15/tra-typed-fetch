import fetch, { FetchError, Request, Response } from 'node-fetch';

enum RequestMethod {
  Get = 'GET',
  Destroy = 'DELETE',
  Patch = 'PATCH',
  Post = 'POST',
}

interface IResponse extends Partial<Response> {
  headers: Response['headers'];
}

interface IRequest extends Partial<Request> {
  headers: Request['headers'];
  payload: Request['body'];
  requestMethod: RequestMethod;
  url: Request['url'];
}

const transformRequest = (request: IRequest): IRequest => {
  let transformedRequest = { ...request };
  if (transformedRequest.requestMethod !== RequestMethod.Get) {
    Object.defineProperty(transformedRequest, 'body', {
      value: JSON.stringify(transformedRequest.payload),
      writable: false,
    });
  }
  return transformedRequest;
};

const request = async (params: IRequest): Promise<IResponse> => {
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

    return Promise.resolve(json);
  } catch (error) {
    return Promise.reject(error);
  }
};

const get = async (params: IRequest) => {
  return request({
    ...params,
    requestMethod: RequestMethod.Get,
  });
};

const post = async (params: IRequest) => {
  return request({
    ...params,
    requestMethod: RequestMethod.Post,
  });
};

const patch = async (params: IRequest) =>
  request({
    ...params,
    requestMethod: RequestMethod.Patch,
  });

const destroy = async (params: IRequest) =>
  request({
    ...params,
    requestMethod: RequestMethod.Destroy,
  });

export { get, destroy, patch, post };
