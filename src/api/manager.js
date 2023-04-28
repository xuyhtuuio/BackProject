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


