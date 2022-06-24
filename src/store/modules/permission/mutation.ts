import { SET_ROUTES } from "./constant";
import { permissionState } from "./store";
import { constantRoutes } from "@/router";

const mutations = {
  [SET_ROUTES](state: permissionState, routes: any): void {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

export default mutations;
