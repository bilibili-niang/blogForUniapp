import {useMemberStore} from "@/stores";
import home from "./home";
import auth from "./auth";

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
        const token = memberStore.profile?.Token
        if (token) {
            options.header.Authorization = token
        }
        // 请求超时,默认60s
        options.timeout = 60000;
    }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

type Data<T> = {
    code: string
    msg: string
    result: T
    message: string
    success: boolean
    Name: string
    Token: string
}

export const http = <T>(options: UniApp.RequestOptions) => {
    return new Promise<Data<T>>((resolve, reject) => {
        uni.request({
            ...options,
            // 只代表响应成功,并没有判断状态码
            success: (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    (res.data as Data<T>).success = true
                    resolve(res.data as Data<T>)
                } else if (res.statusCode === 401) {
                    (res.data as Data<T>).success = false
                    // 401错误,清理用户信息,重定向到登录
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    uni.navigateTo({url: '/pages/login/index'})
                    reject(res)
                } else {
                    (res.data as Data<T>).success = false
                    uni.showToast({
                        icon: 'none',
                        title: (res.data as Data<T>).message || '请求错误'
                    })
                    reject(res)
                }
            },
            fail: (err) => {
                uni.showToast({
                    icon: 'none',
                    title: '网络错误,换个网络试试'
                })
                reject(err)
            }
        })
    })
}
export default {
    baseUrl,
    ...home,
    ...auth
}
