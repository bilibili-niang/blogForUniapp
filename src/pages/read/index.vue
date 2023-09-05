<template>
  <view class="read">
{{ data }}
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {nextTick} from "vue";
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import api from "@/utils/api";

const data = ref()
const id = ref()

const init = async () => {
  onLoad((opt: any) => {
    id.value = opt.value
    uni.setStorageSync('readId', opt.value)
  })
  id.value = uni.getStorageSync("readId")
  // 这里tag只有一个
  const res = await api.getMarkdownById({id: id.value})
  data.value = res.result
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

<style scoped>

</style>
