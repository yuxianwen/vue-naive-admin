import { useStore } from "vuex";
import { State } from "../store";
import { Getters } from "../store/utils";

interface IPermissionMyStore {
  state: State;
  getters: Getters;
}
const useMyStore = (): IPermissionMyStore => {
  const { state, getters }: IPermissionMyStore = useStore<State>();
  return { state, getters };
};

export { useMyStore };
export default useMyStore;
