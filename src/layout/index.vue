<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <navbar />
    <div class="main-container">
      <tags-view />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue";
// import Navbar from "./components/Navbar.vue";
// import Sidebar from "./components/Sidebar/index.vue";
import TagsView from "./components/TagsView/index.vue";
</script>

<style scoped>
.app-wrapper {
  /* @include clearfix; */
  position: relative;
  height: 100%;
  width: 100%;
  /* 
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    } */
}
</style>
