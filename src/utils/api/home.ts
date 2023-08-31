import {http} from "./index";

export default {
    /**
     * 获取首页数据
     * @return Promise
     */
    async home() {
        return http<String[]>({url: '/api/home'})
    },
    /**
     * 获取数据失败的测试
     */
    async homeFail() {
        return http<String[]>({url: '/api/fail'})
    }
}
