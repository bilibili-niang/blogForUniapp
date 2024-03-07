<template>
  <view class="read">
    <div class="ice-row margin-lr-10 margin-top-s">
      <up-text :lines="1" :text="data.title" bold size="16"></up-text>
    </div>
    <up-text :text="getTimeByStr(data.updatedAt)||'-'" size="12"></up-text>
    <view class="content markdown" v-html="content">

    </view>
    <view class="tags">

    </view>
    <!--    {{ data }}-->
  </view>
</template>

<script setup lang="ts">
import {nextTick, ref} from "vue";
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import api from "@/utils/api";
import {getTimeByStr} from '@/utils/tools'

const data = ref()
const id = ref()

// markdown的html内容
let content = ref('')

const init = async () => {
  onLoad((opt: any) => {
    id.value = opt.value
    uni.setStorageSync('readId', opt.value)
  })
  id.value = uni.getStorageSync("readId")
  // 这里tag只有一个
  // 通过id请求详情
  const res = await api.getMarkdownById({id: id.value})
  data.value = res.result
  const contentTemp = await api.getMarkdownContent({id: id.value})
  if (contentTemp.success) {
    content.value = contentTemp.result + ''
  }
  uni.stopPullDownRefresh();
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
.read{
  .padding-lr-20();
}
.content{
  background: @borderColor;
  border-radius: @radio-s;
  margin-bottom: @margin-m;
}
</style>
