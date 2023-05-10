import MyAxios from "~/service/request/MyAxios.js";

export function getNoticeList(page) {
    return MyAxios.get({
        url: `/admin/notice/${page}`
    })
}


export function changeNotice(id, data) {
    return MyAxios.post({
        url: `/admin/notice/${id}`,
        data
    })
}

export function DeleteNotice(id) {
    return MyAxios.post({
        url: `/admin/notice/${id}/delete`
    })
}

export function AddNoticeList(data) {
    return MyAxios.post({
        url: "/admin/notice",
        data
    })
}
