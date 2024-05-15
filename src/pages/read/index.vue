<template>
  <view class="read ice-column">
    <div class="readDataContainer ice-column">
      <div class="row w-percent100">
        <up-text :text="data.name"></up-text>
      </div>
      <div class="row  margin-top-m">
        <up-tag text="description" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>

      <div class="row">
        <up-text :text="data.description"></up-text>
      </div>
      <div class="row margin-top-m">
        <up-tag text="content" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>
      <div class="row">
        <up-text :text="data.content"></up-text>
      </div>

      <div class="row margin-top-m">
        <up-tag text="tags" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>
      <div class="row margin-top-s">
        <div class="margin-lr-10">
          <up-tag :text="data.tag1" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag1"></up-tag>
        </div>
        <div class="margin-lr-10">
          <up-tag :text="data.tag2" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag2"></up-tag>
        </div>
        <div class="margin-lr-10">
          <up-tag :text="data.tag3" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag3"></up-tag>
        </div>
      </div>
    </div>
    <div class="readDataContainer margin-top-m">
      <Activity/>
    </div>

  </view>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import api from '@/utils/api'
import { activeColor } from '@/config'
import Activity from './components/Activity/index.vue'

const data = ref()
const id = ref()

const init = async () => {
  onLoad((opt: any) => {
    id.value = opt.value
    uni.setStorageSync('readId', opt.value)
  })
  id.value = uni.getStorageSync('readId')
  // 这里tag只有一个
  // 通过id请求详情
  const res = await api.getEventDetail({ id: id.value })
  data.value = res.result
  uni.stopPullDownRefresh()
}

// 下拉触发刷新
onPullDownRefresh(() => {
  init()
})

nextTick(() => {
  init()
})

</script>

<style scoped lang="less">
.read {
  border-radius: @radio-ls;
  min-height: 50vh;
  padding: @padding-m;

  .readDataContainer {
    border-radius: @radio-ls;
    border: 1px solid @themeActiveColor;
    padding: @padding-s;
  }
}

</style>
