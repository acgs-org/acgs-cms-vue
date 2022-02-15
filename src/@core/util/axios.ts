import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

import { config } from "../config";

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

const axiosConfig: AxiosRequestConfig = {
  baseURL: config.baseURL || "",
  timeout: 5 * 1000,
};

const http: AxiosInstance = axios.create(axiosConfig);

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
});

http.interceptors.response.use(async (res) => {
  return res.data;
});

export { http };
