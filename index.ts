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
const GET = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	// 注意先解构config，避免params被覆盖
	try {
		const response = await axios
			.get(url, { ...config, params: params });
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}
const POSTJSON = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	try {
		const response = await axios.post(url, params, config);
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const POSTFROM = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	// 这里的header设置可能存在被覆盖的风险
	try {
		const response = await axios.post(url, QS.stringify(params), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			},
			...config
		});
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const PUT = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	try {
		const response = await axios.put(url, params, config);
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const DELETE = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	try {
		const response = await axios.delete(url, {
			...config,
			params: params
		});
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
}

const PATCH = async (url: string, params: any, config: AxiosRequestConfig = {}) => {
	try {
		const response = await axios.patch(url, params, config);
		return await Promise.resolve(response);
	} catch (error) {
		if (errorHandle)
			errorHandle(error);
		return await Promise.reject(error);
	}
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
