<template>
  <div>
    <n-menu :options="menuOptions" />
  </div>
</template>

<script lang="ts" setup>
import { useMyStore } from "@/hooks/use-store";
import { Component, h } from "vue";
import { RouteRecordRaw, RouterLink } from "vue-router";
import { HomeOutline as HomeIcon } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const { state: myState, getters } = useMyStore();

const routes = getters["permission/permission_routes"];

interface MenuItem {
  label: String;
  path: string;
  key: string;
  icon?: string;
  children?: MenuItem[];
}

const menuOptions = routes.reduce((prev, curr): [] => {
  console.log("prev", prev);
  console.log("curr", curr);

  // const hidden = !(curr.meta as any).hidden;
  const hidden = curr.meta ? curr.meta.hidden : false;
  if (!hidden) {
    let item;
    let menuItem = {} as any;
    if (curr.children) {
      if (curr.children.length === 1) {
        item = curr.children[0];
      } else if (curr.children && curr.children.length > 1) {
        item = curr;
        menuItem.children = [];
        curr.children.forEach((child) => {
          const { meta, name } = child;
          const { title } = meta || {};

          menuItem.children.push({
            label: child.children
              ? title
              : () =>
                  h(
                    RouterLink,
                    {
                      to: {
                        name,
                      },
                    },
                    { default: () => title }
                  ),
            key: name,
            // icon: child.meta.icon,
          });
        });
      }

      const { meta, name } = item || {};
      const { title } = meta || {};
      menuItem = {
        label: menuItem.children
          ? title
          : () =>
              h(
                RouterLink,
                {
                  to: {
                    name,
                  },
                },
                { default: () => title }
              ),
        key: name,
        icon: renderIcon(HomeIcon),

        ...menuItem,
      };
    }
    prev.push(menuItem);
  }

  return prev;
}, [] as any);
</script>
