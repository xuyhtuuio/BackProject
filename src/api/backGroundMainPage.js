import MyAxios from "~/service/request/MyAxios.js";

export function getBackStatisticsFirst () {
    return MyAxios.get({
        url: "/admin/statistics1"
    })
}

export function getBackStatisticsThird (Timetype) {
    return MyAxios.get({
        url: "admin/statistics3?type=".concat(Timetype)
    })
}

export function getBackStatisticsSecond () {
    return MyAxios.get({
        url : "/admin/statistics2"
        }
    )
}
