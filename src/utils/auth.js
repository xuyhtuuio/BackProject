import {useCookies} from "@vueuse/integrations/useCookies";

const tokenKey = "userToken"
let cookie = useCookies();

export function getToken() {
    return cookie.get(tokenKey)
}

export function setToken(token) {
    return cookie.set(tokenKey, token)
}

export function removeToken(token) {
    return cookie.remove(tokenKey)
}

