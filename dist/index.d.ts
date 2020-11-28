import 'isomorphic-fetch';
declare enum RequestMethod {
    Get = "GET",
    Destroy = "DELETE",
    Patch = "PATCH",
    Post = "POST"
}
interface IResponse {
}
interface IRequest {
    payload: any;
    requestMethod: RequestMethod;
    url: string;
}
declare const get: (params: IRequest) => Promise<IResponse>;
export { get };
