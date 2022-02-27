import { createRouter, createWebHistory } from "vue-router";
import { baseRoutes } from "./base-routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes,
});

export default router;
