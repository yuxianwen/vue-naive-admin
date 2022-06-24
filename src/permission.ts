import router from "./router";
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
// import { useStore } from "vuex";
import store from "@/store";
// import { useMyStore } from "@/hooks/use-store";

import naiveui from "@/utils/naiveui";
import { RouteRecordRaw } from "vue-router";

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  naiveui.loadingBar.start();
  // const store = useStore();
  // const { state: myState, getters } = useMyStore();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      naiveui.loadingBar.finish();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles =
        store.getters["user/roles"] && store.getters["user/roles"].length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          await store.dispatch("user/GET_INFO");
          const accessRoutes = store.getters["permission/permission_routes"];

          console.log(accessRoutes);
          // dynamically add accessible routes
          accessRoutes.forEach((v: RouteRecordRaw) => {
            router.addRoute(v);
          });

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          console.log(error);
          await store.dispatch("user/RESET_TOKEN");
          naiveui.message.error(error + "" || "Has Error");
          next(`/login?redirect=${to.path}`);
          naiveui.loadingBar.finish();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      naiveui.loadingBar.finish();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  naiveui.loadingBar.finish();
});
