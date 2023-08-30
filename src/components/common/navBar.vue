<template>
  <div class="navBar">
    <uni-nav-bar dark :fixed="true" shadow status-bar left-icon="left" left-text="返回"
                 :title="title" @clickLeft="back">
      <template v-slot:right>
        <view class="top-nav-right">
          <img src="http://localhost:89/avatar.png" class="avatar" @click="loginOut">
          <view class="text">
            李里理
          </view>
        </view>
      </template>
    </uni-nav-bar>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const loginOut = () => {
  uni.removeStorageSync('token')
  uni.navigateTo({
    url: '/pages/index/index'
  })
}
const props = defineProps({

  title: {
    type: String,
    default: '首页'
  }
})
const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style scoped lang="less">
.flex-row(@direction: row) {
  display: flex;
  flex-direction: @direction;
}

/deep/ .uni-navbar__header-btns-right {
  width: 140rpx !important;
}

.top-nav-right {
  overflow: visible;
  .flex-row();
  align-items: center;

  .avatar {
    display: flex;
    width: 45rpx;
    height: 45rpx;
  }

  .text {
    margin-left: 10rpx;
    white-space: nowrap;
    font-size: 20rpx;
  }
}
</style>
