import MyAxios from "~/service/request/MyAxios.js";


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
    keyword: "ceshi"
}) {

    //拼接处理
    const ConcatArr = []
    for (let key in pt) {
        if(pt[key]) {
            ConcatArr.push(`${key}=${encodeURIComponent(pt[key])}`)
        }
    }
    const result = ConcatArr.join("&")
    return MyAxios.post({
            url: `/admin/manager/${page}?` + result
    })
}


