import {http} from "./index";
// 用户权限相关

export default {
    /**
     * login
     * @return Promise
     */
    async login(params:Object){
        return http<String[]>({
            url: '/api/Patrol/Login',
            data:params,
            method:'POST'
        })
    }

}
