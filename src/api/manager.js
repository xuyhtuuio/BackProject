import MyAxios from "~/service/request/MyAxios.js";
import {concatURL} from "~/utils/managerUtil.js";


export function login(username, password) {
    return MyAxios.post({
            url: '/admin/login',
            data: {
                username,
                password
            }
        }
    )
}

export function getPermission () {
    return MyAxios.post({
        url: "/admin/getinfo",
    })
}

export function logout () {
    return MyAxios.post({
        url: "/admin/logout",
    })
}

export function changePassword (data) {
    return MyAxios.post({
        url : "/admin/updatepassword",
        data,
    })
}

export function getMangerList (page, pt={
    limit : 10,
    keyword: ""
}) {
    //拼接处理
    const r = concatURL(pt)
    return MyAxios.get({
            url: `/admin/manager/${page}?` + r
    })
}

export function deleteManagerList (id) {
    return MyAxios.post({
        url: `/admin/manager/${id}/delete`
    })
}


export function changeManager (id, data) {
    return MyAxios.post({
        url: `/admin/manager/${id}`,
        data
    })
}


