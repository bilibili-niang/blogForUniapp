<template>
  <view class="tabBar">
    <view class="tabCon">
      <view class="Lim" v-for="(item, index) in list" :key="index"
            :class="[
        ('/' + currentRoute) ===item.path?'active':''
    ]"
      >
        <view class="item" @click="navigate(item.index)">
          <view class="title">{{ item.title }}</view>
          <image v-if="item.icon" class="icon" :src="item.icon"/>
          <image v-if="item.activeIcon" class="activeIcon" :src="item.activeIcon"/>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { globalStore } from '@/stores'

let currentRoutes = getCurrentPages() // 获取当前打开过的页面路由数组
let currentRoute = currentRoutes[currentRoutes.length - 1].route //获取当前页面路由

const list = reactive([
  {
    title: '首页',
    index: 1,
    path: '/pages/index/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: 'add',
    index: 2,
    path: '/pages/addEvents/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: '列表',
    index: 3,
    path: '/pages/list/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: 'mine',
    index: 4,
    path: '/pages/mine/index',
    icon: '',
    activeIcon: ''
  }
])

const global = globalStore()
// 添加跳转逻辑
const navigate = (value: string) => {
  global.changePage(value)
}
</script>

<style scoped lang="less">
.tabBar {
  display: flex;
  position: fixed;
  bottom: 10rpx;
  left: 0;
  z-index: 5;
  width: 100vw;

  .tabCon {
    background: @tabBac;
    .flex-row();
    justify-content: space-around;
    width: 95%;
    margin: 0 auto;
    padding-top: @padding-s;
    padding-bottom: @padding-l;
    border-radius: @radio-l;
    overflow: hidden;

  }


  .Lim {
    border-bottom: rgba(0, 0, 0, 0) 0 solid;
    transition-duration: .5s;

    .item {
      background: @bacColor;
      margin-left: @margin-m;
      margin-right: @margin-m;
      border-radius: @radio-m;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding-left: @padding-s;
      padding-right: @padding-s;
      padding-bottom: 0rpx;
      transition-duration: .5s;

      .title {
        font-size: @font-s;
        white-space: nowrap;
        font-weight: normal;
      }

    }
  }

  // 激活样式
  .active {

    .Lim {
      overflow: hidden;
      border-radius: 50% !important;
    }

    .item {
      padding-bottom: @padding-s !important;
      overflow: hidden;
      background: @fontColor !important;
      color: @bacColor !important;

      .title {
        font-size: @font-s !important;
        color: @bacColor !important;
      }
    }
  }

}

</style>
