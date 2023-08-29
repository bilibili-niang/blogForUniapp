import {baseUrl, http} from "./index";

export default {
    async home() {
        return http({url: `${baseUrl}/home`})
    }
}
