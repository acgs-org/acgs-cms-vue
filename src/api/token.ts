import { http, type ResponseVO } from "@/@core/util/axios";

/**
 * 登录信息类型封装
 */
export interface LoginInfo {
  username: string;
  password: string;
}

/**
 * Token 令牌类型封装
 */
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Token 令牌相关 API
 */
const tokenApi = {
  Login: "/user/login",
};

/**
 * 通过登录信息获取令牌
 * @param loginInfo 用户登录信息
 * @returns {ResponseVO<Tokens>} 双令牌验证信息
 */
export const getTokens = (loginInfo: LoginInfo) => {
  return http.post<LoginInfo, ResponseVO<Tokens>>(tokenApi.Login, loginInfo);
};
