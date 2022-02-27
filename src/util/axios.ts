import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { config } from "@/config";
import { useUserStore } from "@/stores/user";

/** 自定义返回值封装 */
export interface ResponseVO<T> {
  /** 状态码 */
  code: number;
  /** 响应信息 */
  message: string;
  /** 响应结果 */
  result: T;
  /** 响应状态 */
  success: boolean;
  /** 响应时间戳 */
  timestamp: Date;
}

/**
 * request 请求配置项
 */
const axiosConfig: AxiosRequestConfig = {
  baseURL: config.baseURL || "",
  timeout: 5 * 1000,
  headers: {
    Authorization: useUserStore().getAccessToken,
  },
};

const http: AxiosInstance = axios.create(axiosConfig);

/** 异常拦截处理器 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any) => {
  if (error.response) {
    const data: ResponseVO<unknown> = error.response.data;
    return data;
  }
  return new Promise(error);
};

/** request 请求拦截器 */
http.interceptors.request.use((originConfig) => {
  const requestConfig = { ...originConfig };

  // 请求路径容错处理
  if (!requestConfig.url) {
    throw new Error("request need url");
  }

  if (!requestConfig.method) {
    requestConfig.method = "GET";
  }

  return requestConfig;
}, errorHandler);

/** response 响应拦截器 */
http.interceptors.response.use(async (res) => {
  return res.data;
}, errorHandler);

export { http };
