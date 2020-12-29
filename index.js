import axios from "axios";
import QS from "qs";

// 默认配置
let defaults = {
  baseURL: "",
  withCredentials: true,
};
// 写入配置
axios.defaults = {
  ...defaults,
};

// 请求拦截器，后添加的先执行，先添加的后执行
axios.interceptors.request.use(
  (config) => {
    // 判断
    if (sessionStorage.getItem("token")) {
      // 判断token是否存在
      config.headers.token = sessionStorage.getItem("token"); // 将token设置成请求头
    }
    return config;
  },
  (error) => {
    // 出错
    throw error;
  }
);

// 响应拦截器，先添加的先执行，后添加的后执行
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // code不为200出错
    throw error;
  }
);
let errorHandle = null;
function setErrorHandle(handle) {
  errorHandle = handle;
}

// 创建请求,other本质是config，其中包含header等
const POSTJSON = (url, params, others = {}) => {
  return axios
    .post(url, params, others)
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

const GET = (url, params, others = {}) => {
  return axios
    .get(url, { ...others, params: params })
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

const POSTFORM = (url, params, others = {}) => {
  // 这里的header设置可能存在被覆盖的风险
  return axios
    .post(url, QS.stringify(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      ...others,
    })
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

const PUT = (url, params) => {
  return axios
    .put(url, params)
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

const DELETE = (url, params) => {
  return axios
    .delete(url, { params: params })
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

const PATCH = (url, params) => {
  return axios
    .patch(url, params)
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

// 通用，可设置多属性 自定义header，以及其他参数
const POSTJSONALL = (url, params, others = {}) => {
  return axios
    .patch(url, params, others)
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (errorHandle) errorHandle(err);
      return Promise.reject(err);
    });
};

export default {
  ...axios,
  setErrorHandle,
  POSTJSON,
  POSTFORM,
  GET,
  PUT,
  DELETE,
  PATCH,
  POSTJSONALL,
};
