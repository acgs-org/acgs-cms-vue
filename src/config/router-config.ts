import type { RouteRecordRaw } from "vue-router";

/** 菜单栏图标导入 */
import { FundOutlined, TeamOutlined } from "@ant-design/icons-vue";

/** 菜单栏类型定义 */
interface Stage {
  id: string;
  title: string;
  icon?: unknown;
  path: string;
  roles: Array<string>;
  enable: boolean;
  children?: Array<Stage>;
}

/** 菜单栏配置设置 */
export const stage: Array<Stage> = [
  {
    id: "1",
    title: "控制中心",
    icon: FundOutlined,
    path: "/term",
    roles: ["root"],
    enable: false,
    children: [
      {
        id: "1-1",
        title: "Nacos",
        path: "/nacos",
        roles: ["root"],
        enable: false,
      },
    ],
  },
  {
    id: "2",
    title: "用户管理",
    icon: TeamOutlined,
    path: "/user",
    roles: ["root", "admin"],
    enable: false,
    children: [
      {
        id: "2-2",
        title: "用户信息",
        path: "/info",
        roles: ["root", "admin"],
        enable: false,
      },
    ],
  },
];

/** 菜单栏路由管理 */
export const asyncRouterMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: "/term/nacos",
        component: () => import("../views/term/Nacos.vue"),
      },
      {
        path: "/user/info",
        component: () => import("../views/user/Info.vue"),
      },
    ],
  },
];
