import { reactive } from "vue";

import router from "@/router";
import { asyncRouterMap, stage, type Stage } from "@/config";
import type { RoleInfo } from "@/api/role";

/** 封装菜单栏数据 */
let menus: Array<Stage> = [];

/**
 * 判断当前角色组中 是否包含指定角色
 * @param roles 角色组信息
 * @param roleName 角色名称
 */
const isRole = (roles: Array<RoleInfo>, roleName: string): boolean => {
  const exist = roles.find((role) => role.name === roleName);
  return exist !== undefined ? true : false;
};

/**
 * 深度遍历算法, 遍历到最底层后执行相应操作
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
const deep = (data: any, fun: Function) => {
  if (data.children) {
    // 当前数据有子数据, 继续遍历
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.children.forEach((item: any) => {
      // 对应子节点深度遍历
      deep(item, fun);
    });
    // 有子节点数据无需载入外层数据
    return;
  } else {
    // 当前无子节点, 执行回调函数
    fun(data);
  }
};

/**
 * 初始化菜单栏配置
 * @param roles 当前用户的角色组信息
 */
export const initMenus = (roles: Array<RoleInfo>) => {
  // 判断当前角色是否为 root 角色
  if (isRole(roles, "root")) {
    // 当前角色为 root 角色, 可以访问全部数据
    menus = stage;
    return;
  }

  // 判断当前角色是否为 admin 角色
  if (isRole(roles, "admin")) {
    // 当前角色为 admin 角色, 可以访问非 root 页面
    stage.forEach((menu) => {
      if (menu.roles.includes("root")) {
        // 排除 root 权限页面
        return;
      } else {
        menus.push(menu);
      }
    });
    return;
  }

  // 当前角色为普通角色
  stage.forEach((menu) => {
    if (menu.roles.includes("root") || menu.roles.includes("admin")) {
      // 排除 root、admin 权限页面
      return;
    } else {
      // 普通权限页面, 可以执行添加操作
      menu.roles.forEach((role) => {
        if (menus.includes(menu)) {
          // 当前页已进行过添加, 直接跳过当前页
          return;
        }

        // 遍历该页面所有可访问角色
        if (isRole(roles, role)) {
          // 角色组数据包含当前页面角色, 可以执行添加操作
          if (menu.children) {
            // 当前页面存在子页面, 深度遍历
            // TODO: 添加子页面逻辑判断处理
            // menu.children.forEach((item) => {});
          }
          // 当前页面不存在子页面, 或子页面排除完毕, 添加相应页面配置
          menus.push(menu);
          // 跳出当前配置页
          return;
        } else {
          // 不存在访问该页面权限 跳过当前权限
          return;
        }
      });
      roles.forEach((role) => {
        // 遍历用户角色组
        if (menu.roles.includes(role.name)) {
          // 存在访问该页面权限
          if (menu.children) {
            // 当前页面存在子页面, 深度遍历
            menu.children.forEach((item) => {
              if (item.roles.includes(role.name)) {
                // 子页面符合权限设置, 无须操作直接添加
              } else {
                // 子页面权限不符
              }
            });
          }
          // 子页面排除完成, 或该页面不包含子页面, 直接添加相应配置
          menus.push(menu);
        } else {
          // 不存在访问该页面权限 跳过当前页
          return;
        }
      });
    }
  });
};

/**
 * 初始化路由配置
 */
export const initRouter = () => {
  // 不符合条件的路由数据
  const badPath: Array<string> = [];
  // 遍历全部路由配置
  asyncRouterMap.children?.forEach((route) => {
    // 创建许可 path 路径集合
    const pathes: Array<string> = [];
    // 深度遍历初始化后后菜单栏配置
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deep(menus, (data: any) => {
      pathes.push(data.path);
    });
    // 判断当前路由是否在许可 path 路径集合中
    if (!pathes.includes(route.path)) {
      // 当前路由不在许可 path 路径集合中
      if (!badPath.includes(route.path)) {
        // 当前路由尚未添加
        badPath.push(route.path);
      }
    }
  });

  // 添加路由配置
  router.addRoute(asyncRouterMap);

  // 移除不允许的路由
  badPath.forEach((path) => {
    router.removeRoute(path);
  });

  // 跳转到首页
  setTimeout(() => router.push("/home"), 500);
};

export const getMenus = () => {
  return reactive(menus);
};
