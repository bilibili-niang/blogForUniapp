import {createSSRApp} from "vue";
import App from "./App.vue";
import pinia from './stores'
import tabBar from "@/components/common/tabBar/tabBar.vue";

const app = createSSRApp(App)
app.component('tabBar', tabBar);

export function createApp() {
    app.use(pinia)
    return {
        app
    };
}
