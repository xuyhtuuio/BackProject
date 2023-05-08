import {ElNotification} from "element-plus";

export function NoPermission() {
    return ElNotification({
        title: '你没有权限',
        message: '你不配',
        type: 'warning',
        duration: 2000
    })
}

export function LoginSuccess() {
    return ElNotification({
        title: '牛逼',
        message: '你记住了你的密码！！',
        type: 'success',
        duration: 2000,
        showClose: false
    })
}

export function WrongPassword() {
    return ElNotification({
        title: '废物',
        message: '密码你都记不住？？',
        type: 'error',
        duration: 2000
    })
}

export function NoRepeatLogin () {
    return ElNotification({
        title: '别他妈重复登录',
        message: '欠？',
        type: 'error',
        duration: 2000
    })
}

export function updatePasswordSuccess(message="修改成功") {
    return ElNotification({
        title: '?',
        message,
        type: 'warning',
        duration: 2000,
        showClose: false
    })
}

export function universal(title, message, type="success") {
    return ElNotification({
        title,
        message,
        type,
    })
}



