import {asyncAddRoute, router} from "~/router/index.js";
import {getToken} from "~/utils/auth.js";
import {NoPermission, NoRepeatLogin} from "~/utils/pop.js";
import store from "~/store/index.js";
import {login} from "~/api/manager.js";
import {endLoading, startLoading} from "~/utils/loading.js";
import {useCookies} from "@vueuse/integrations/useCookies";

let cookie = useCookies();
router.beforeEach(async (to, from, next) => {
    startLoading()
    let token = getToken();
    if (!token && to.path !== "/login") {
        NoPermission()
        return next({path: "login"})
    }
    if (token && to.path === "/login") {
        NoRepeatLogin()
        return next({path: from.path ? from.path : "/"})
    }

    let hasNewRoutes = false
    //如果用户登录了，那么就自动获取登录的信息
    if (token) {
        await store.dispatch("getUserInfo", store)
        hasNewRoutes = asyncAddRoute(store.state.user.data.menus)
    }
    store.commit("change_login_state", false)

    //设置动态标题
    document.title = (to.meta.title ? to.meta.title : "").concat("——您最坚实的后盾～").trim()
    //如果添加了路由才能指定下一个跳转的地方，不然是死循环
    hasNewRoutes ? next(to.fullPath) : next()
})


router.afterEach((to, from) => {
    endLoading()
})

