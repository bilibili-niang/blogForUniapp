<template>
  <view class="read">
    <view class="title">
      {{ data?.title }}
    </view>
    <view class="time">
      {{ data?.updatedAt }}
    </view>
    <view class="content">
      {{ data?.content }}

    </view>
    <view class="tags">

    </view>
    <!--    {{ data }}-->
  </view>
  <tabBar></tabBar>
</template>

<script setup lang="ts">
import {nextTick, ref} from "vue";
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import api from "@/utils/api";
import TabBar from "@/components/common/tabBar/tabBar.vue";


const data = ref()
const id = ref()

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
  const content = await api.getMarkdownContent({id: id.value})
  console.log('content')
  console.log(content);

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
.read {
  .padding-lr-20();
}
</style>
