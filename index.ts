import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import QS from 'qs';

// 默认配置
let defaults = {
	baseURL: "",
	withCredentials: true,
}

// 写入配置
axios.defaults = {
	...defaults,
}

// 请求拦截器，后添加的先执行，先添加的后执行
axios.interceptors.request.use(
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		// 判断
		if (sessionStorage.getItem("token")) {
			// 将token设置为请求头
			config.headers.token = sessionStorage.getItem("token");
		}
		return config;
	},
	(error) => {
		// 出错
		throw error;
	}
)

// 响应拦截器，先添加的先执行，后添加的后执行
axios.interceptors.response.use(
	(response: AxiosResponse<any>): AxiosResponse<any> => {
		return response.data;
	},
	(error) => {
		// code 不为200出错
		throw error;
	}
)

// 设置统一错误处理
let errorHandle: Function | null = null;
function setErrorHandle(handle: Function): void {
	errorHandle = handle;
}

// 相关请求封装
const GET = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	// 注意先解构config，避免params被覆盖
	return axios
		.get(url, { ...config, params: params })
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}
const POSTJSON = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	return axios.post(url, params, config)
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}

const POSTFROM = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	// 这里的header设置可能存在被覆盖的风险
	return axios.post(url, QS.stringify(params), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		...config
	})
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}

const PUT = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	return axios.put(url, params, config)
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}

const DELETE = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	return axios.delete(url, {
		...config,
		params: params
	})
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}

const PATCH = (url: string, params: any, config: AxiosRequestConfig = {}) => {
	return axios.patch(url, params, config)
		.then((response: AxiosResponse<any>) => Promise.resolve(response))
		.catch(error => {
			if (errorHandle) errorHandle(error);
			return Promise.reject(error);
		})
}

export default {
	...axios,
	setErrorHandle,
	POSTJSON,
	POSTFROM,
	GET,
	PUT,
	DELETE,
	PATCH,
}
