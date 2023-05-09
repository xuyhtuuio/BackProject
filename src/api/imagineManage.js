import MyAxios from "~/service/request/MyAxios.js";

export function getImagineList(page) {
    return MyAxios.get({
        url: `/admin/image_class/${page}`
    })
}

export function AddClassicAboutPicture(data) {
    return MyAxios.post({
        url: "/admin/image_class",
        data
    })
}

export function ChangeClassicAboutPicture(data, id) {
    return MyAxios.post({
        url: `/admin/image_class/${id}`,
        data
    })
}

export function DeleteClassicAboutPicture(id) {
    return MyAxios.post({
        url: `/admin/image_class/${id}/delete`
    })
}

export function getPictureByClassic(id, page) {
    return MyAxios.get({
        url: `/admin/image_class/${id}/image/${page}?limit=10`
    })
}

export function changePictureName (id, name) {
    return MyAxios.post({
        url: `/admin/image/${id}`,
        data : {
            name
        }
    })
}

export function DeletePicture (ids=[]) {
    return MyAxios.post({
        url: `/admin/image/delete_all`,
        data: {
            ids
        }
    })
}

export const UploadAPI = "/api/admin/image/upload"
