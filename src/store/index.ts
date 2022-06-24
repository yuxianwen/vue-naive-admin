import { createStore } from "vuex";
import { modules } from "./modules";
import { permissionState } from "./modules/permission/store";
import { userState } from "./modules/user/store";

type State = {
  permission: permissionState;
  user: userState;
};

const store = createStore<State>({
  modules,
});

export type { State };
export default store;
