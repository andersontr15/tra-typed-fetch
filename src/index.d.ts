import { IRequestRequired, IRequestRequiredGet, IResponse } from './interfaces';
declare const get: <T>(params: IRequestRequiredGet) => Promise<IResponse<T>>;
declare const post: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
declare const patch: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
declare const put: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
declare const destroy: <T>(params: IRequestRequired) => Promise<IResponse<T>>;
export { get, destroy, patch, post, put };
