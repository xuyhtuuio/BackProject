import MyAxios from "~/service/request/MyAxios.js";

export function getImagineList (page) {
    return MyAxios.get({
        url: `/admin/image_class/${page}`
    })
}
