import Layout from "@/layout/index.vue";

const routers = [
  {
    path: "/user",
    component: Layout,
    redirect: "/user/list",
    meta: { title: "人员管理", icon: "user" },
    children: [
      {
        path: "create",
        component: () => import("@/views/user/create.vue"),
        name: "UserCreate",
        meta: { title: "添加人员" },
      },
      {
        path: "list",
        component: () => import("@/views/user/list.vue"),
        name: "UserList",
        meta: { title: "信息管理" },
      },
    ],
  },
];

export default routers;
