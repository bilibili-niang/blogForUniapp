import { http } from "./index";
export default {
    /**
     * 获取首页数据
     * @return Promise
     */
    async home(params) {
        return http({
            url: '/api/home',
            data: params,
            method: 'POST'
        });
    },
    /**
     * 获取数据失败的测试
     */
    async homeFail() {
        return http({ url: '/api/fail' });
    },
    /**
     * 获取首页推荐文章
     */
    async homeRecommend() {
        return http({ url: '/api/markdownFile/getRecommend' });
    },
    /**
     * 获取所有tags
     */
    async allTags() {
        return http({ url: '/api/markdownFile/tags' });
    },
    /**
     * 随机获取一条文章数据
     */
    async getRandomOne() {
        return http({
            url: '/api/markdownFile/random'
        });
    },
    /**
     * 通过tags获取与其有关的文章列表
     * @param params
     */
    async aboutTags(params) {
        return http({
            url: '/api/tag/aboutTag',
            method: 'POST',
            data: params
        });
    },
    async getMarkdownById(params) {
        return http({
            url: '/api/markdownFile/getData',
            method: 'POST',
            data: params
        });
    },
    async getMarkdownContent(params) {
        return http({
            url: '/api/markdownFile/transformToHtml',
            method: 'POST',
            data: params
        });
    }
};
//# sourceMappingURL=home.js.map