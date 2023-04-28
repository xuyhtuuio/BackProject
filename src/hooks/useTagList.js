import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {ref} from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";
import {router} from "~/router/index.js";

export function encaTagList() {
    let route = useRoute();
    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '小崔的首页',
            path: "/"
        },
    ])
    let cookies = useCookies();

    function updateTag(RouteItem) {
        const {path} = RouteItem
        let isHasRoute = tabList.value.findIndex(e => e.path == path) === -1
        if (isHasRoute) {
            tabList.value.push(RouteItem)
        }
        cookies.set("tabList", tabList.value)
    }

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        updateTag({
            title: to.meta.title,
            path: to.path
        })
    })

//跳转到对应的路由界面
    const jumpToRoute = (pane) => router.push(pane.props.name)

    const removeTab = (targetName) => {
        let tabitem = tabList.value.findIndex(e => e.path == targetName)
        if (tabitem) {
            tabList.value.splice(tabitem, 1)
            cookies.set("tabList", tabList.value)
        }

        //判断只剩一个的情况下
        if (tabList.value.length === 1) {
            router.push("/")
        }
    }


//动态获取列表
    function initTabList() {
        let tbs = cookies.get("tabList");
        console.log(tbs)
        if (tbs) {
            tabList.value = tbs
        }
    }

     //执行
    initTabList()
    const closeOther = () => {
        const resultTabList = tabList.value.filter((item, index) => {
            return item.path == activeTab.value || index < 1
        })
        if (resultTabList) {
            tabList.value = resultTabList
            cookies.set("tabList", tabList.value)
        }
    }

    const closeAll = () => {
        tabList.value = tabList.value.filter((item, index) => {
            return index < 1
        })

        //设置为首页响应
        activeTab.value = "/"
        //同时跳转会首页
        router.push("/")
        //存到cookie里
        cookies.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        jumpToRoute,
        removeTab,
        closeOther,
        closeAll
    }
}
