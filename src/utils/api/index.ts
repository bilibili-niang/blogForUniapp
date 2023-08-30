import {useMemberStore} from "@/stores";
import home from "./home";

export const baseUrl: String = `https://blog.icestone.work`;

// 添加拦截器
const httpInterceptor = {
    // 拦截前触发
    invoke(options: UniApp.RequestOptions) {
        options.header = {
            ...options.header,
            'source-client': 'miniapp',
        }
        // 添加token:
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            options.header.Authorization = token
        }
        // 请求超时,默认60s
        options.timeout = 60000;
    }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export const http = (options: UniApp.RequestOptions) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...options,
            success: (res) => {
                resolve(res)
            },

        })
    })
}
export default {
    baseUrl,
    ...home
}
