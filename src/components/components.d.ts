import iceSwiper from '../pages/index/components/iceSwiper.vue'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        iceSwiper: typeof iceSwiper
    }
}
