import store from "~/store/index.js";

function hasPermission(value, el) {
    if (!Array.isArray(value)) {
        throw new Error(`传的不是数组`)
    }

    if (el && !store.state.rules.find(rule => value.includes(rule))) {
        console.log("没有这个权限")
        el.parentNode && el.parentNode.removeChild(el)
    }
}

export default {
    install(app) {
        app.directive("permission", {
            mounted(el, binding) {
                hasPermission(binding.value, el)
            }
        })
    }
}
