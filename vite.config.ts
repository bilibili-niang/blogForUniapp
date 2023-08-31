import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${path.resolve(__dirname, 'src/static/css/common.less')}";@import "${path.resolve(__dirname, 'src/static/css/variable.less')}";`
            }
        }
    },
    server: {
        https: false,
        proxy: {
            '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
                // target: 'https://blog.icestone.work', // 目标地址 --> 服务器地址
                target: 'http://sanitation.juzhentech.com', // 目标地址 --> 服务器地址
                changeOrigin: true, // 允许跨域
                ws: true,  // 允许websocket代理
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                // rewrite: (path) => path.replace(/^\/api/, "")
            }
        },
    }
});
