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
import axios from 'axios';
import QS from 'qs';
// 默认配置
var defaults = {
    baseURL: "",
    withCredentials: true,
};
// 写入配置
axios.defaults = __assign({}, defaults);
// 请求拦截器，后添加的先执行，先添加的后执行
axios.interceptors.request.use(function (config) {
    // 判断
    if (sessionStorage.getItem("token")) {
        // 将token设置为请求头
        config.headers.token = sessionStorage.getItem("token");
    }
    return config;
}, function (error) {
    // 出错
    throw error;
});
// 响应拦截器，先添加的先执行，后添加的后执行
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    // code 不为200出错
    throw error;
});
// 设置统一错误处理
var errorHandle = null;
function setErrorHandle(handle) {
    errorHandle = handle;
}
// 相关请求封装
var GET = function (url, params, config) {
    if (config === void 0) { config = {}; }
    // 注意先解构config，避免params被覆盖
    return axios
        .get(url, __assign(__assign({}, config), { params: params }))
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
var POSTJSON = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return axios.post(url, params, config)
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
var POSTFROM = function (url, params, config) {
    if (config === void 0) { config = {}; }
    // 这里的header设置可能存在被覆盖的风险
    return axios.post(url, QS.stringify(params), __assign({ headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        } }, config))
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
var PUT = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return axios.put(url, params, config)
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
var DELETE = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return axios.delete(url, __assign(__assign({}, config), { params: params }))
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
var PATCH = function (url, params, config) {
    if (config === void 0) { config = {}; }
    return axios.patch(url, params, config)
        .then(function (response) { return Promise.resolve(response); })
        .catch(function (error) {
        if (errorHandle)
            errorHandle(error);
        return Promise.reject(error);
    });
};
export default __assign(__assign({}, axios), { setErrorHandle: setErrorHandle,
    POSTJSON: POSTJSON,
    POSTFROM: POSTFROM,
    GET: GET,
    PUT: PUT,
    DELETE: DELETE,
    PATCH: PATCH });
