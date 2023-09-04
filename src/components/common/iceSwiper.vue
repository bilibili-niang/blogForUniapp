<template>
  <div class="iceSwiper">
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" interval="2000"
            duration="500"
            @change="durationChange"
    >
      <swiper-item>
        <view class="swiper-item uni-bg-red">A</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-green">B</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item uni-bg-blue">C</view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const indicatorDots = ref(true)
// 使用uniHelper提供的类型来声明
const durationChange: UniHelper.SwiperOnChange = (event) => {
  console.log('change')
  console.log(event)
  // 获取index
  console.log(event.detail?.current)
  // 非空断言,表示detail不可能为空
  console.log(event.detail!.current)
}


</script>

<style scoped>

</style>
