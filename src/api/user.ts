import { http, type ResponseVO } from "@/util/axios";

/**
 * 注册信息类型封装
 */
export interface RegisterInfo {
  username: string;
  password: string;
  roles: Array<string>;
  nick: string;
  phone?: string;
  email?: string;
  img?: string;
}

/**
 * 用户信息类型封装
 */
export interface User {
  id: string;
  username: string;
  roles: Array<string>;
  nick?: string;
  phone?: string;
  email?: string;
  img?: string;
}

/**
 * 用户相关 API
 */
const userApi = {
  Register: "/user/register",
};

/**
 * 用户注册方法
 * @param registerInfo 用户注册信息
 * @returns {ResponseVO<boolean>} 注册结果 true | false
 */
export const register = (registerInfo: RegisterInfo) => {
  return http.post<RegisterInfo, ResponseVO<boolean>>(
    userApi.Register,
    registerInfo
  );
};
