import router from "@/router";
import config from "@/config";

const asyncRoutes = config.asyncRouterMap;

export const initRouter = () => {
  asyncRoutes.forEach((route) => {
    router.addRoute(route);
  });
  router.push({ path: "/" });
};
