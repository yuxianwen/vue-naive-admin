import { userState } from "./store";

const moduleGetters = {
  token: (state: userState): string | undefined => {
    return state.token;
  },
  roles: (state: userState): string[] => {
    return state.roles;
  },
};

export default moduleGetters;
