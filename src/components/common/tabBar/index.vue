<template>
  <view class="tabBar">
    <view class="tabCon">
      <view class="Lim" v-for="(item, index) in list" :key="index"
            :class="[global.$state.activePage===item.index&&'active']">
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
import { ref, watch } from 'vue'
import { globalStore, useMemberStore } from '@/stores'

const list = ref([
  /*{
    title: '首页',
    index: '1',
    path: '/pages/index/index',
    icon: '',
    activeIcon: ''
  },*/
  {
    title: 'add',
    index: '2',
    path: '/pages/addEvents/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: '列表',
    index: '3',
    path: '/pages/list/index',
    icon: '',
    activeIcon: ''
  },
  {
    title: 'mine',
    index: '4',
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

const memberStore = useMemberStore()
watch(memberStore, () => {
  if (memberStore.$state.profile===null) {
    navigate('4')
    list.value = [{
      title: 'mine',
      index: '4',
      path: '/pages/mine/index',
      icon: '',
      activeIcon: ''
    }]
  } else {
    navigate('2')
    list.value = [
      {
        title: 'add',
        index: '2',
        path: '/pages/addEvents/index',
        icon: '',
        activeIcon: ''
      },
      {
        title: '列表',
        index: '3',
        path: '/pages/list/index',
        icon: '',
        activeIcon: ''
      },
      {
        title: 'mine',
        index: '4',
        path: '/pages/mine/index',
        icon: '',
        activeIcon: ''
      }
    ]
  }
})
const init = () => {
  if (memberStore.$state.profile===null) {
    navigate('4')
    list.value = [{
      title: 'mine',
      index: '4',
      path: '/pages/mine/index',
      icon: '',
      activeIcon: ''
    }]
  }
}

init()

</script>

<style scoped lang="less">
.tabBar {
  display: flex;
  position: fixed;
  bottom: 30px;
  left: 0;
  z-index: 5;
  width: 100vw;
  align-items: center;

  .tabCon {
    background: rgba(255, 255, 255, .9);
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
      background: rgba(0, 0, 0, .1);
      margin-left: @margin-m;
      margin-right: @margin-m;
      border-radius: @radio-m;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding-left: @padding-s;
      padding-right: @padding-s;
      padding-bottom: 0;
      transition-duration: .5s;

      .title {
        font-size: @font-s;
        white-space: nowrap;
        font-weight: normal;
        text-align: center;
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
      background: @themeActiveColor !important;
      color: @bacColor !important;

      .title {
        font-size: @font-s !important;
        color: @bacColor !important;
      }
    }
  }
}

</style>