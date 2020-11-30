import { __assign } from 'tslib';
import { Headers } from 'node-fetch';
import { RequestMethod, RequestParams } from './enums';
console.log('hit');
var transformRequest = function (request) {
  console.warn('in req!!!!!');
  var transformedRequest = __assign({}, request);
  if (transformedRequest.requestMethod !== RequestMethod.Get) {
    Object.defineProperty(transformedRequest, RequestParams.Body, {
      value: JSON.stringify(transformedRequest.payload),
      writable: false,
    });
  }
  buildBaseHeaders().forEach(function (value, name) {
    var _a;
    return (_a = transformedRequest.headers) === null || _a === void 0
      ? void 0
      : _a.append(value, name);
  });
  return transformedRequest;
};
var buildBaseHeaders = function () {
  return new Headers({
    'content-type': 'application/json',
  });
};
export { buildBaseHeaders, transformRequest };
