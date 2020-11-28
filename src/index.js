import { __assign, __awaiter, __generator } from 'tslib';
import fetch, { FetchError } from 'node-fetch';
import { RequestMethod } from './enums';
import { transformRequest } from './utils';
var request = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    var request, response, json, formattedResponse, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          request = transformRequest(params);
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [4 /*yield*/, fetch(request.url, request)];
        case 2:
          response = _a.sent();
          if (!response.ok) {
            throw new FetchError(
              response.statusText,
              request.method + '-' + request.url
            );
          }
          return [4 /*yield*/, response.json()];
        case 3:
          json = _a.sent();
          formattedResponse = {
            headers: response.headers,
            data: json,
            status: response.status,
          };
          return [2 /*return*/, Promise.resolve(formattedResponse)];
        case 4:
          error_1 = _a.sent();
          return [2 /*return*/, Promise.reject(error_1)];
        case 5:
          return [2 /*return*/];
      }
    });
  });
};
var get = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        request(
          __assign(__assign({}, params), { requestMethod: RequestMethod.Get })
        ),
      ];
    });
  });
};
var post = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        request(
          __assign(__assign({}, params), { requestMethod: RequestMethod.Post })
        ),
      ];
    });
  });
};
var patch = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        request(
          __assign(__assign({}, params), { requestMethod: RequestMethod.Patch })
        ),
      ];
    });
  });
};
var put = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        request(
          __assign(__assign({}, params), { requestMethod: RequestMethod.Put })
        ),
      ];
    });
  });
};
var destroy = function (params) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        request(
          __assign(__assign({}, params), {
            requestMethod: RequestMethod.Destroy,
          })
        ),
      ];
    });
  });
};
export { get, destroy, patch, post, put };
