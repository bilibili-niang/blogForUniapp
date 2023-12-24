import {createSSRApp} from "vue";
import App from "./App.vue";
// 导入less
import "icepro/dist/style.css";
import icepro from "icepro/dist/icepro.js";
import pinia from './stores'
import tabBar from "@/components/common/tabBar/tabBar.vue";
// @ts-ignore
// import hljs from 'highlight'

const app = createSSRApp(App)
app.component('tabBar', tabBar);

icepro.install(app);

// 这里可以切换不同的主题
// import 'highlight/styles/a11y-dark.css'


export function createApp() {
    app.use(pinia)
    return {
        app
    };
}
