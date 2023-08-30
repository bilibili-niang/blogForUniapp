import {createSSRApp} from "vue";
import App from "./App.vue";
import pinia from './stores'

const methodToPatch = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack']

methodToPatch.map(item => {
    //  needAuth 表示 是否需要 鉴权
    // @ts-ignore
    uni[item] = function (opt = {}, needAuth) {
        let token = uni.getStorageSync("token")
        console.log('获取的token', token)
        if (!token) {
            console.log('重定向')
            /*uni.navigateTo({
                url: '/pages/login/index'
            })*/
        } else {
            console.log('登录')
        }
        /*if (needAuth && !token) { // 需要登录且未登录
            uni.navigateTo({
                url: '/pages/login/index'
            })
        } else {
            return original.call(this, opt)
        }*/
    }
})


export function createApp() {
    const app = createSSRApp(App);
    app.use(pinia)
    return {
        app
    };
}
