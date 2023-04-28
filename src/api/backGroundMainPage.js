import MyAxios from "~/service/request/MyAxios.js";

export function getBackStatisticsFirst () {
    return MyAxios.get({
        url: "/admin/statistics1"
    })
}
