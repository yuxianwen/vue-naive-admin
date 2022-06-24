import type { DialogApiInjection } from "naive-ui/es/dialog/src/DialogProvider";
import type { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";
import type { LoadingBarApiInjection } from "naive-ui/es/loading-bar/src/LoadingBarProvider";

interface Naiveui {
  message: MessageApiInjection;
  dialog: DialogApiInjection;
  loadingBar: LoadingBarApiInjection;
}
const naiveui: Naiveui = {
  //@ts-ignore
  message: {},
  //@ts-ignore
  dialog: {},
  // @ts-ignore
  loadingBar: {},
};

export default naiveui;
