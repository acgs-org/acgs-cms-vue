import { reactive } from "vue";

import router from "@/router";
import { asyncRouterMap, stage } from "@/config";

export const initRouter = () => {
  asyncRouterMap.forEach((route) => {
    router.addRoute(route);
  });
  router.push({ path: "/" });
};

export const getMenus = () => {
  return reactive(stage);
};
