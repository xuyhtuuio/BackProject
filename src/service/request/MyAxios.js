import axios from "axios";
import {BASEURL, TIMEOUT} from "~/service/request/config.js";
import {ElNotification} from "element-plus";
import {getToken, setToken, removeToken} from "~/utils/auth.js";
import {NoPermission, WrongPassword, LoginSuccess, updatePasswordSuccess} from "~/utils/pop.js";
import store from "~/store/index.js";

let SINGLE = true
class MyAxios {
    constructor(BASEURL, TIMEOUT) {
        this.instance = axios.create({
            baseURL: BASEURL,
            timeout: TIMEOUT
        })

        this.instance.interceptors.request.use(function (config) {
            //存储cookie
            const token = getToken()
            if (token) {
                config.headers["token"] = token
            }
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

// 添加响应拦截器
        this.instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            if(SINGLE) {
                LoginSuccess()
                SINGLE = false
            }
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(r => {
                resolve(r.data)
            }).catch(reject => {
                store.commit("change_login_state", false)
                console.log(reject.response)
                if(reject.response.config.url === "/admin/updatepassword") {
                    updatePasswordSuccess(reject.response.data.msg)
                }
                else WrongPassword()
            })
        })
    }

    get(config) {
        return this.request({...config, method: "get"})
    }

    post(config) {
        return this.request({...config, method: "post"})
    }
}

export default new MyAxios(BASEURL, TIMEOUT)
