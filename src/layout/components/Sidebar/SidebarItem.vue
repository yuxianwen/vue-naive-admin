<template>
  <div v-if="!item.meta.hidden">
    <!-- <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template> -->

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";
import path from "path";
import { isExternal } from "../../../utils/validate";
import Item from "./Item.vue";
import { RouteRecord,RouteRecordRaw,  } from "vue-router";

interface Props {
  item: RouteRecord;
  basePath: string;
  isNest: boolean;
}

const name = "SidebarItem";
const props = withDefaults(defineProps<Props>(), {
  // route object
  isNest: false,
  basePath: "",
});
const data = reactive({ onlyOneChild: props.item });

const hasOneShowingChild = (
  children: RouteRecord[] = [],
  parent: RouteRecord
): Boolean => {
  const showingChildren = children.filter((item): Boolean => {
    if (item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      data.onlyOneChild = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    data.onlyOneChild = {
      ...parent,
      path: "",
      meta: { ...parent.meta, noShowingChildren: true },
    };
    return true;
  }

  return false;
};
const resolvePath = (routePath: string): string => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
