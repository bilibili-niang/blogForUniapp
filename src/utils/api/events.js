import { http } from "./index";
export default {
    async postEvents(params) {
        return http({
            url: '/api/events/addTodayEvent',
            data: params,
            method: 'POST'
        });
    }
};
//# sourceMappingURL=events.js.map