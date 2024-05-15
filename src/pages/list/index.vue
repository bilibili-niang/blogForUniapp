<template>
  <view class="list padding-top-l">
    <view class="content" v-if="list">
      <view class="listLim" v-for="(item,index) in list" :key="index">
        <Item :item="item"></Item>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import api from '@/utils/api'
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import Item from '@/pages/about/components/Item/index.vue'

const list = ref()

// 当前页数
const pageNum = ref(1)
// 每页数量
const pageSize = ref(20)

const init = async () => {
  // 加载弹窗
  uni.showToast({
    icon: 'loading',
    title: 'loading...'
  })
  const res = await api.home({
    pageNum: pageNum.value,
    pageSize: pageSize.value
  })
  if (res.success) {
    if (pageNum.value !== 1) {
      list.value = list.value.concat(res.result.rows)
    } else {
      list.value = res.result.rows
    }
  } else {
    list.value = false
  }
}

// 触底
onReachBottom(() => {
  console.log('触底')
  // pageNum++
  pageNum.value++
  init()
})

// 下拉触发刷新
onPullDownRefresh(() => {
  pageNum.value = 1
  init()
})

init()
</script>

<style scoped lang="less">
.list {
  .padding-lr-10();
}
</style>
