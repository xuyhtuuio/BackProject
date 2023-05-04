import {createStore} from 'vuex'
import {getPermission} from "~/api/manager.js";
import {asyncAddRoute} from "~/router/index.js";

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            //用户信息
            user: {},
            is_loading_login: false,
            //展开或缩起菜单
            asideWidth: "250px",
            rules : [],
        }
    },
    mutations: {
        change_user_info(state, user) {
            state.user = user
        },
        change_login_state(state, isShow) {
            state.is_loading_login = isShow
        },
        clean_user_info(state) {
            state.user = {}
        },
        isAsideWidth(state) {
            state.asideWidth = state.asideWidth == "64px" ? "250px" :  "64px"
        },
        set_rulesName(state, rules) {
            state.rules = rules
        },

    },
    actions: {
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getPermission().then(res => {
                    //将登录的用户信息存储到vuex中
                    commit("change_user_info", res)
                    commit("set_rulesName", res.data.ruleNames)
                    resolve(res)
                })
            })
        }
    }
})


export default store
