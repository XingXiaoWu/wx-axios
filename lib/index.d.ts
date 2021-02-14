import { AxiosRequestConfig, AxiosResponse } from 'axios';
declare interface ResponseX<T = any> {
    status: string;
    message: string;
    data?: T;
}
declare function setErrorHandle(handle: Function): void;
declare const _default: {
    setErrorHandle: typeof setErrorHandle;
    POSTJSON: <T = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T>;
    POSTFROM: <T_1 = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T_1>;
    GET: <T_2 = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T_2>;
    PUT: <T_3 = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T_3>;
    DELETE: <T_4 = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T_4>;
    PATCH: <T_5 = ResponseX<any>>(url: string, params: any, config?: AxiosRequestConfig) => Promise<T_5>;
    create(config?: AxiosRequestConfig | undefined): import("axios").AxiosInstance;
    Cancel: import("axios").CancelStatic;
    CancelToken: import("axios").CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T_6>(values: (T_6 | Promise<T_6>)[]): Promise<T_6[]>;
    spread<T_7, R>(callback: (...args: T_7[]) => R): (array: T_7[]) => R;
    isAxiosError(payload: any): payload is import("axios").AxiosError<any>;
    defaults: AxiosRequestConfig;
    interceptors: {
        request: import("axios").AxiosInterceptorManager<AxiosRequestConfig>;
        response: import("axios").AxiosInterceptorManager<AxiosResponse<any>>;
    };
    getUri(config?: AxiosRequestConfig | undefined): string;
    request<T_8 = any, R_1 = AxiosResponse<T_8>>(config: AxiosRequestConfig): Promise<R_1>;
    get<T_9 = any, R_2 = AxiosResponse<T_9>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R_2>;
    delete<T_10 = any, R_3 = AxiosResponse<T_10>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R_3>;
    head<T_11 = any, R_4 = AxiosResponse<T_11>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R_4>;
    options<T_12 = any, R_5 = AxiosResponse<T_12>>(url: string, config?: AxiosRequestConfig | undefined): Promise<R_5>;
    post<T_13 = any, R_6 = AxiosResponse<T_13>>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<R_6>;
    put<T_14 = any, R_7 = AxiosResponse<T_14>>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<R_7>;
    patch<T_15 = any, R_8 = AxiosResponse<T_15>>(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<R_8>;
};
export default _default;
