import { RouteRecordRaw } from "vue-router";
import { permissionState } from "./store";

const moduleGetters = {
  permission_routes: (state: permissionState): RouteRecordRaw[] => {
    return state.routes;
  },
};

export default moduleGetters;
