import nprogress from "nprogress"

export function startLoading() {
    nprogress.start()
}

export function endLoading() {
    nprogress.done()
}
