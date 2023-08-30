import iceSwiper from './common/iceSwiper.vue'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        iceSwiper: typeof iceSwiper
    }
}
