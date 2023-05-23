export function concatURL (query) {
    const ConcatArr = []
    for (let key in query) {
        if(query[key]) {
            ConcatArr.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    return ConcatArr.join("&")
}
