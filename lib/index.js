var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import QS from 'qs';
// 默认配置
var defaults = {
    baseURL: process.env.VUE_APP_BASE_API || '',
    withCredentials: true,
    timeout: 50000
};
// 此处不可使用解构，否则返回的不是axios.defaults实例，而是单独的对象
// axios.defaults = {
// 	...axios.defaults,
// 	...defaults,
// }
// 写入配置
axios.defaults = Object.assign(axios.defaults, defaults);
// 请求拦截器，后添加的先执行，先添加的后执行
var xingwuDefaultInterceptorsRequest = axios.interceptors.request.use(function (config) {
    // 写入默认需求
    return config;
}, function (error) {
    // 出错
    return Promise.reject(error);
});
// 响应拦截器，先添加的先执行，后添加的后执行
var xingwuDefaultInterceptorsResponse = axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var _a, _b, _c, _d, _e, _f;
    // 判断是否前端请求就直接挂掉了，没到后台
    if (!error.response) {
        return Promise.reject(error);
    }
    // code 不为200出错
    // 有几种情况是不需要外抛的,直接此处处理
    var status = error.response.status;
    // 401
    // if (status === 401) {
    // 	//   如果是web端，则跳转
    // 	if (process.env.VUE_APP_PLATFORM === 'PCWEB') {
    // 		window.location.href = `/login/?service=${encodeURIComponent(window.location.href)}`
    // 	}else if (process.env.VUE_APP_PLATFORM === 'h5') {
    // 		window.location.href = 
    // 			`${window.location.origin}/login/?service=${encodeURIComponent(
    // 			  `${window.location.href}`,
    // 			)}`
    // 	}
    // 	// 如果是小程序，还有其他操作要做
    // 	// return {}
    // }
    // // 403
    // if (status === 403) {
    // 	// 如果是pcweb或者h5
    // 	if (process.env.VUE_APP_PLATFORM === 'PCWEB' || process.env.VUE_APP_PLATFORM === 'h5') {
    // 		window.location.href = '/noAuth' // 无权限页面路由地址
    // 	}
    // 	// 如果是小程序，还有其他操作要做
    // 	// return {}
    // }
    // 以下兼容某些后端团队，设置http status不正确，并返回response
    var errorMsg = ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || ((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.msg) || '服务端请求出错，请稍后重试！';
    var notFindMsg = ((_f = (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || '请求地址错误！';
    if (status === 404) {
        error.message = notFindMsg;
    }
    else {
        error.message = errorMsg;
    }
    return Promise.reject(error);
});
// 设置统一错误处理
var errorHandle = null;
var setErrorHandle = function (handle) {
    errorHandle = handle;
};
// 如果不需要默认拦截器，可以移除
var removeDefaultInterceptors = function () {
    axios.interceptors.request.eject(xingwuDefaultInterceptorsRequest);
    axios.interceptors.response.eject(xingwuDefaultInterceptorsResponse);
};
// 相关请求封装9
var GET = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios
                            .get(url, __assign(__assign({}, config), { params: __assign(__assign({}, params), { noche: new Date().getTime() }) }))];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                case 2:
                    error_1 = _c.sent();
                    if (errorHandle)
                        errorHandle(error_1);
                    return [2 /*return*/, Promise.reject(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var POSTJSON = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post(url, params, config)];
                case 1:
                    response = _e.sent();
                    if (response.config.responseType === 'blob') {
                        return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                    }
                    return [2 /*return*/, Promise.resolve((_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.data) !== null && _d !== void 0 ? _d : response.data)];
                case 2:
                    error_2 = _e.sent();
                    if (errorHandle)
                        errorHandle(error_2);
                    return [2 /*return*/, Promise.reject(error_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var POSTFORM = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post(url, QS.stringify(params), __assign({ headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            } }, config))];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                case 2:
                    error_3 = _c.sent();
                    if (errorHandle)
                        errorHandle(error_3);
                    return [2 /*return*/, Promise.reject(error_3)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var PUT = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.put(url, params, config)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                case 2:
                    error_4 = _c.sent();
                    if (errorHandle)
                        errorHandle(error_4);
                    return [2 /*return*/, Promise.reject(error_4)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var DELETE = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_5;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.delete(url, __assign(__assign({}, config), { params: params }))];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                case 2:
                    error_5 = _c.sent();
                    if (errorHandle)
                        errorHandle(error_5);
                    return [2 /*return*/, Promise.reject(error_5)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var PATCH = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_6;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.patch(url, params, config)];
                case 1:
                    response = _c.sent();
                    return [2 /*return*/, Promise.resolve((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : response.data)];
                case 2:
                    error_6 = _c.sent();
                    if (errorHandle)
                        errorHandle(error_6);
                    return [2 /*return*/, Promise.reject(error_6)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
// 下载
var DOWNLOAD = function (url, params, config) {
    if (config === void 0) { config = { responseType: 'blob' }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios
                            .get(url, __assign(__assign({}, config), { params: params }))];
                case 1:
                    response = _a.sent();
                    // TODO: 修正类型
                    return [2 /*return*/, Promise.resolve(response)];
                case 2:
                    error_7 = _a.sent();
                    if (errorHandle)
                        errorHandle(error_7);
                    return [2 /*return*/, Promise.reject(error_7)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var DOWNLOADPOST = function (url, params, config) {
    if (config === void 0) { config = { responseType: 'blob' }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post(url, params, config)];
                case 1:
                    response = _a.sent();
                    // TODO: 修正类型
                    return [2 /*return*/, Promise.resolve(response)];
                case 2:
                    error_8 = _a.sent();
                    if (errorHandle)
                        errorHandle(error_8);
                    return [2 /*return*/, Promise.reject(error_8)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
export default __assign(__assign({}, axios), { setErrorHandle: setErrorHandle, removeDefaultInterceptors: removeDefaultInterceptors, POSTJSON: POSTJSON, POSTFORM: POSTFORM, GET: GET, PUT: PUT, DELETE: DELETE, PATCH: PATCH, DOWNLOAD: DOWNLOAD, DOWNLOADPOST: DOWNLOADPOST });
