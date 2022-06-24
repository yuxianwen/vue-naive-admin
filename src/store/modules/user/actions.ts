import { GET_INFO, GET_TOKEN, LOGOUT, RESET_TOKEN } from "./constant";
import { login, logout, getInfo } from "@/api/user";
import { ActionContext } from "vuex";
import { userState } from "./store";
import { removeToken, setToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";

export default {
  async [GET_TOKEN](
    { commit }: ActionContext<userState, unknown>,
    params: any
  ): Promise<any> {
    const { data } = await login(params);
    commit(GET_TOKEN, data.token);
    setToken(data.token);
  },

  async [LOGOUT]({ commit }: ActionContext<userState, unknown>): Promise<any> {
    await logout();
    commit("SET_TOKEN", "");
    removeToken();
    resetRouter();

    // reset visited views and cached views
    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    // dispatch('tagsView/delAllViews', null, { root: true })
  },

  async [GET_INFO]({
    commit,
  }: ActionContext<userState, unknown>): Promise<any> {
    await getInfo();
    commit("SET_ROLES", ["admin"]);
  },

  async [RESET_TOKEN]({
    commit,
  }: ActionContext<userState, unknown>): Promise<any> {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve(true);
    });
  },
};
