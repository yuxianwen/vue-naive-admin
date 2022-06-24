<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <n-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
// import { scrollTo } from "@/utils/scroll-to";
import { defineProps, reactive, computed } from "vue";
const name = "Pagination";
interface Props {
  total: number;
  page: number;
  limit: number;
  pageSizes: any;
  layout: string;
  background: boolean;
  autoScroll: boolean;
  hidden: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
  page: 1,
  limit: 20,
  pageSizes: [10, 20, 30, 50],
  layout: "total, sizes, prev, pager, next, jumper",
  background: true,
  autoScroll: true,
  hidden: false,
});

const emit = defineEmits(["update:page", "update:limit", "pagination"]);

const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  },
});
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  },
});

const handleSizeChange = (val: any) => {
  emit("pagination", { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    // scrollTo(0, 800, () => {});
  }
};
const handleCurrentChange = (val: any) => {
  emit("pagination", { page: val, limit: pageSize.value });
  if (props.autoScroll) {
    // scrollTo(0, 800, () => {});
  }
};
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
