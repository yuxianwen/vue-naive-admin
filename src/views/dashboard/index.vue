<template>
  <div class="app-container">
    <h1>Dashboard</h1>
  </div>
</template>

<script setup lang="ts">
import { useMyStore } from "@/hooks/use-store";
const { state: myState, getters } = useMyStore();

console.log("myState", myState.permission.routes);
console.log("getters", getters["permission/permission_routes"]);
</script>
