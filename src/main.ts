import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "virtual:windi.css";
// import "./styles/element-variables.scss";

import "./styles/index.css";
// import 'normalize.css'
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

import "./permission"; // permission control

const app = createApp(App);
app.use(router).use(store).mount("#app");
