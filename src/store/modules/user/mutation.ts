import { SET_ROLES, SET_TOKEN } from "./constant";
import { userState } from "./store";

const mutations = {
  [SET_TOKEN](state: userState, token: string): void {
    state.token = token;
  },
  [SET_ROLES](state: userState, roles: []): void {
    state.roles = roles;
  },
};

export default mutations;
