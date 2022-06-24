import actions from "./actions";
import getters from "./getters";
import mutations from "./mutation";
import { createState } from "./store";

const state = createState();
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
