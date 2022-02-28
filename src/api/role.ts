import { http, type ResponseVO } from "@/util/axios";

/**
 * 角色权限封装类
 */
export interface RoleInfo {
  id?: string;
  name: string;
  permission: string;
}

/**
 * 角色相关 API
 */
const roleApi = {
  GetRolesNames: "/user/roles",
};

export const getUserRoles = () => {
  return http.get<unknown, ResponseVO<Array<RoleInfo>>>(roleApi.GetRolesNames);
};
