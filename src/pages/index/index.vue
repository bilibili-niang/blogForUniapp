<template>
  <customNavBar></customNavBar>
  <iceSwiper></iceSwiper>
  <view class="content">

  </view>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import IceSwiper from "@/components/common/iceSwiper.vue";

</script>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.text-area {
  display: flex;
  justify-content: center;

}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
