import {http} from "./index";

export default {
    async postEvents(params:{}){
        return http<String[]>({
            url: '/api/events/addTodayEvent',
            data: params,
            method: 'POST'
        })
    }


}
