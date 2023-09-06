<template>
  <view class="iceSwiper">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" interval="3000"
            duration="1500"
            @change="durationChange"
    >
      <swiper-item v-for="(item,index) in list" :key="index" class="swiperCon">
        <image :src="'https://blog.icestone.work'+item.headImg" alt="" class="swiperImg"/>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  list: {
    type: Array
  }
})

// 传递当前激活的index
const emits = defineEmits(['index'])

const indicatorDots = ref(true)

// 使用uniHelper提供的类型来声明
const durationChange: UniHelper.SwiperOnChange = (event) => {
  // 获取index
  // console.log(event.detail?.current)
  // 非空断言,表示detail不可能为空
  // console.log(event.detail!.current)
  emits('index', event.detail!.current)
}
</script>

<style scoped lang="less">
.iceSwiper {
  border-radius: @radio-ls;
  overflow: hidden;
  padding-top: @padding-m;
  padding-bottom: @padding-m;
}

.swiperCon {
  display: flex;
  width: 95vw;
  justify-content: center;
  border-radius: @radio-ls;

  .swiperImg {
    border-radius: @radio-ls;
    width: 95%;
    height: auto;
    display: flex;
  }
}

swiper {
  height: 25vh;

  swiper-item {
    height: 25vh;
  }
}
</style>
