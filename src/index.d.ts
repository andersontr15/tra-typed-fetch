import { Request, Response } from 'node-fetch';
declare enum RequestMethod {
    Get = "GET",
    Destroy = "DELETE",
    Patch = "PATCH",
    Post = "POST"
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
declare const get: (params: IRequest) => Promise<IResponse>;
declare const post: (params: IRequest) => Promise<IResponse>;
declare const patch: (params: IRequest) => Promise<IResponse>;
declare const destroy: (params: IRequest) => Promise<IResponse>;
export { get, destroy, patch, post };
