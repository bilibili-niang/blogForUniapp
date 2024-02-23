import {http} from "./index";

export default {
    /**
     * 向服务器发起登录
     * @param params
     */
    async login(params: {}) {
        return http<String[]>({
            url: '/api/user/miniLogin',
            data: params,
            method: 'POST'
        })
    },
    /**
     * 向服务器发起登录
     * @param params
     */
    async loginByAccount(params: {}) {
        return http<String[]>({
            url: '/api/user/login',
            data: params,
            method: 'POST'
        })
    },
    /**
     * 通过token获取用户信息
     * @param token
     */
    async getUserInfoByToken(token: string) {
        return http({
            url: '/api/user/getUserInfByToken',
            data: {
                token
            },
            method: 'POST'
        })
    }
}
