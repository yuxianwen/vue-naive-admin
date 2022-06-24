<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";
import MessageApi from "./components/message-api.vue";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // 更改默认主题颜色
    // primaryColor: "#187BCC",
    // primaryColorHover: "#1A7BCC",
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <message-api></message-api>
      </n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style></style>
