import { getToken, setToken, removeToken } from "../../../utils/auth";

export const createState = () => {
  const state = {
    token: getToken(),
    roles: [],
  };
  return state;
};

// 类型推导
export type userState = ReturnType<typeof createState>;
