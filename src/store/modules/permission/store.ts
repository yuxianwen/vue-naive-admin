import { asyncRoutes, constantRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";

// interface IStore {
//   routes: RouteRecordRaw[];
//   addRoutes: RouteRecordRaw[];
// }

export const createState = () => {
  const store = {
    routes: constantRoutes.concat(asyncRoutes),
    addRoutes: asyncRoutes,
  };
  return store;
};

// 类型推导
export type permissionState = ReturnType<typeof createState>;
// export type permissionStore = IStore;
