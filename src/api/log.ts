import { http, type ResponseVO } from "@/util/axios";

/**
 * 登录日志接口
 * @param id 文档 id
 * @param username 登录账户
 * @param nick 用户昵称
 * @param loginTime 登录时间
 */
export interface LoginLogInfo {
  /** 文档 id */
  id: string;
  /** 登录账户 */
  username: string;
  /** 用户昵称 */
  nick: string;
  /** 登录时间 */
  loginTime: Date;
}

/**
 * 日志相关 API
 * @param LOGIN_LOG 登录日志接口
 */
const LOG_API = {
  /** 登录日志接口 */
  LOGIN_LOG: "http://localhost:10010/log/login",
};

/**
 * 获取登录日志方法
 */
export const getLoginLog = () => {
  return http.get<unknown, ResponseVO<Array<LoginLogInfo>>>(LOG_API.LOGIN_LOG);
};
