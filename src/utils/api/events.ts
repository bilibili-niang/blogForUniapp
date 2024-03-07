import {http} from "./index";

export default {
    // event提交
    async postEvents(params: {}) {
        return http<String[]>({
            url: '/api/events/addTodayEvent',
            data: params,
            method: 'POST'
        })
    },
    // 获取事件列表
    async getEvents(params: {}) {
        return http<String[]>({
            url: '/api/events/getTodayEvent',
            data: params,
            method: 'POST'
        })
    },


}
