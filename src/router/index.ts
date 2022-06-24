import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/layout/index.vue";

// import user from "./modules/user";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
];

export const asyncRoutes: RouteRecordRaw[] = [
  // ...user,
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404" },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

const router = createRouter({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  history: createWebHistory(),
  routes: constantRoutes,
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: [],
  });
  // router.matcher = newRouter.matcher // reset router
}

export default router;
