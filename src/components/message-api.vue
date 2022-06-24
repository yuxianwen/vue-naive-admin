<template>
  <div></div>
</template>
<script lang="ts" setup>
import naiveui from "@/utils/naiveui";
import { useLoadingBar, useMessage } from "naive-ui";
naiveui.message = useMessage();
naiveui.loadingBar = useLoadingBar();
</script>
