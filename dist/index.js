import { __assign, __awaiter, __generator } from "tslib";
import 'isomorphic-fetch';
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Get"] = "GET";
    RequestMethod["Destroy"] = "DELETE";
    RequestMethod["Patch"] = "PATCH";
    RequestMethod["Post"] = "POST";
})(RequestMethod || (RequestMethod = {}));
var request = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var requestParams, response, json, err_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!params.requestMethod) {
                    throw Error('Missing request method!');
                }
                if (!Object.values(RequestMethod).includes(params.requestMethod)) {
                    throw new Error('Request method invalid!');
                }
                requestParams = {
                    // ...getRequestHeaders(),
                    method: params.requestMethod,
                };
                if (params.requestMethod !== RequestMethod.Get) {
                    Object.defineProperty(requestParams, 'body', {
                        value: JSON.stringify(params.payload),
                        writable: false,
                    });
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!params.url) {
                    throw new Error('Missing required url!');
                }
                return [4 /*yield*/, fetch(params.url, requestParams)];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw response;
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, response.json()];
            case 4:
                json = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                return [2 /*return*/, Promise.reject(error_1)];
            case 8: return [2 /*return*/];
        }
    });
}); };
var get = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request(__assign(__assign({}, params), { requestMethod: RequestMethod.Get }))];
    });
}); };
var post = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request(__assign(__assign({}, params), { requestMethod: RequestMethod.Post }))];
    });
}); };
var patch = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request(__assign(__assign({}, params), { requestMethod: RequestMethod.Patch }))];
    });
}); };
var destroy = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, request(__assign(__assign({}, params), { requestMethod: RequestMethod.Destroy }))];
    });
}); };
export { get };
