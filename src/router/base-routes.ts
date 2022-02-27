import type { RouteRecordRaw } from "vue-router";

/** 全局通用路由配置 */
export const baseRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/403",
    component: () => import("../views/exception/403.vue"),
  },
  {
    path: "/404",
    component: () => import("../views/exception/404.vue"),
  },
  {
    path: "/500",
    component: () => import("../views/exception/500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
