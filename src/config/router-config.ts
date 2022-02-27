import type { RouteRecordRaw } from "vue-router";

export const asyncRouterMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/Layout.vue"),
  },
];
