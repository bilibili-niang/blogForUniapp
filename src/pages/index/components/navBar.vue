<template>
  <view class="navBar">
    <uni-nav-bar shadow @clickLeft="back" left-icon="left" :title="title">
      <template #right>
        <view class="avatarLim">
          <rightUserInfo :userInfo="userInfo"></rightUserInfo>
        </view>
      </template>
    </uni-nav-bar>
  </view>
</template>

<script setup lang="ts">

import RightUserInfo from "@/pages/index/components/rightUserInfo.vue";
import {reactive} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
const userInfo = reactive({
  nickName: '李力理',
  avatar: 'http://blog.icestone.top/upload_78351ef6c80b4d627a95dbaa9634cea6.jpg'
})

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped lang="less">
.navBar {
  /deep/ .uni-navbar__header {
    padding-left: 5rpx !important;
    padding-right: 10rpx !important;

  }

  /deep/ .uni-navbar__header-btns-right {
    width: fit-content !important;
  }
}
</style>
