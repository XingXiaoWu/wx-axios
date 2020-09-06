/**
 * Created by sk on 2020 1 17.
 */
import axios from 'axios'
import QS from 'qs'

//基地址
axios.defaults.baseURL = '' //接口代理地址参见：config/index.js中的proxyTable配置
axios.defaults.withCredentials = true

//   是否生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 添加业务处理函数
let responseHandle = null
let errorHandle = null
// 设置业务处理函数
function setResponseHandle (handle) {
    responseHandle = handle
}

function setErrorHandle(handle){
    errorHandle = handle
}
// 错误处理
function interceptorErr (err) {
    // showError(err)
    throw err
}

function showError (err) {
    errorHandle(err)
}

//添加一个请求拦截器
axios.interceptors.request.use((config) => {
    if (sessionStorage.getItem('token')) {
        // 判断token是否存在
        config.headers.token = sessionStorage.getItem('token') // 将token设置成请求头
    }
    return config
}, interceptorErr)

// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
    if (responseHandle) {
        return responseHandle(response.data)
    }
    return response.data
}, interceptorErr)

// let translateNetError = (error) => {
//   return {
//     status: error.response.status,
//     message: '系统异常，' + error.response.statusText + '错误码：' + error.response.status,
//   }
// }
//通用方法postJson
const POSTJSON = (url, params, others = {}) => {
    // return axios.post(url, params).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .post(url, params, others)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                // 处理error
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

const POSTFORM = (url, params, others = {}) => {
    // return axios.post(url, QS.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .post(url, QS.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                ...others,
            })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

const GET = (url, params, others = {}) => {
    // return axios.get(url, {params: params}).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .get(url, { params: params, ...others })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

const PUT = (url, params) => {
    // return axios.put(url, params).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .put(url, params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

const DELETE = (url, params) => {
    // return axios.delete(url, {params: params}).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .delete(url, { params: params })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

const PATCH = (url, params) => {
    // return axios.patch(url, params).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .patch(url, params)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

// 通用，可设置多属性 自定义header，以及其他参数
const POSTJSONALL = (url, params, others = {}) => {
    // return axios.post(url, params, others).then(res => res.data)
    return new Promise((resolve,reject) => {
        axios
            .patch(url, params, others)
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                showError(error)
                reject(error)
                //   resolve(translateNetError(error))
            })
    })
}

export default {
    ...axios,
    POSTJSON,
    POSTFORM,
    GET,
    PUT,
    DELETE,
    PATCH,
    POSTJSONALL,
    setResponseHandle,
    setErrorHandle
}