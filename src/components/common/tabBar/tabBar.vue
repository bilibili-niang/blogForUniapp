<template>
  <view class="tabBar">
    <view class="Lim" v-for="(item, index) in list" :key="index">
      <view class="item" @click="navigate(item.path)">
        <view class="title">{{ item.title }}</view>
        <image v-if="item.icon" class="icon" :src="item.icon"/>
        <image v-if="item.activeIcon" class="activeIcon" :src="item.activeIcon"/>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive} from "vue";

let currentRoutes = getCurrentPages(); // 获取当前打开过的页面路由数组
let currentRoute = currentRoutes[currentRoutes.length - 1].route //获取当前页面路由

const list = reactive([
  {
    title: '首页',
    path: '/pages/index/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: 'add',
    path: '/pages/addEvents/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: '列表',
    path: '/pages/list/index',
    icon: '',
    activeIcon: ''
  }
]);

// 添加跳转逻辑
const navigate = (path: string) => {
  if (('/' + currentRoute) != path) {
    uni.navigateTo({
      url: `${path}`
    })
  } else {
    console.log('多此一举')
  }
};
</script>

<style scoped lang="less">
.tabBar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 20rpx;
  left: 0;
  z-index: 5;


  .Lim {

    .item {
      background: @bacColor;
      margin-left: @margin-m;
      margin-right: @margin-m;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 10rpx;
    }
  }

  .icon, .activeIcon {
  }
}


</style>
