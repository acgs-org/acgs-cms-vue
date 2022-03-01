import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

import { config } from "@/config";
import { useUserStore } from "@/stores/user";
import { i18nRender } from "@/locales";
import { refreshTokens, type Tokens } from "@/api/token";

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
};

const http: AxiosInstance = axios.create(axiosConfig);

/** 异常拦截处理器 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandler = (error: any) => {
  const response = error.response;
  if (response) {
    if (response.status === 401) {
      // Token 令牌验证异常
      const path: string = error.request.responseURL;
      if (path.split("10010")[1] === "/user/refresh") {
        // 已经进行过刷新令牌请求
        notification.error({
          message: i18nRender("token.invalid.message"),
          description: i18nRender("token.invalid.description"),
        });
        // 退出登录
        useUserStore().logout();
        // 跳转到登录页面
        useRouter().push("/login");
      } else {
        // 刷新令牌信息
        console.log("重发请求");
        refreshTokens().then((data: ResponseVO<Tokens>) => {
          if (data.success) {
            // 保存刷新后令牌信息
            useUserStore().tokens = data.result;
            http(response.config).then((data) => {
              return data.data;
            });
          }
        });
      }
    }
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

  if (useUserStore().getTokens) {
    // eslint-disable-next-line
    requestConfig.headers!["Authorization"] = useUserStore().getAccessToken;
    // 过期令牌 用于端口测试
    // requestConfig.headers["Authorization"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6IjYyMDhhOWM3ZjJhYjU1MWU0MTI1MzgyOCIsInNjb3BlIjoic2NvcGUiLCJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2MDYyMTcxfQ.tyAIAyYRbM7z5Ucyz5MJpne65rhaVSnV8sacQlKgePw";
  }

  return requestConfig;
}, errorHandler);

/** response 响应拦截器 */
http.interceptors.response.use(async (res) => {
  if (res.headers["Authorization"]) {
    // 如果存在新的令牌信息,保存新的令牌
    const accessToken = res.headers["Authorization"];
    useUserStore().tokens.accessToken = accessToken;
  }
  console.log(useUserStore().getAccessToken);
  return res.data;
}, errorHandler);

export { http };
