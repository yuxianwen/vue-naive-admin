import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import WindiCSS from "vite-plugin-windicss";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

const port = ~~process.env.port || ~~process.env.npm_config_port || 9527; // dev port

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    // ...
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  server: {
    port,
    open: true,
  },
});
