<template>
  <view class="read">
    <div class="ice-column userCard">
      <up-text :lines="1" :text="data.title" bold size="17" class="margin-bottom-s"></up-text>
      <up-text :text="getTimeByStr(data.updatedAt)||'-'" size="16"></up-text>
      <div class="ice-row justStart alignEnd">
        <up-image :show-loading="true" :src="imgUrl" width="80px" height="80px" shape="circle"></up-image>
        <div class="ice-row">
          <up-text text="作者:"></up-text>
          <up-text :text="userData.value.username"></up-text>
        </div>
      </div>
    </div>
    <view class="content markdown" v-html="content">

    </view>
    <view class="tags">

    </view>
  </view>
</template>

<script setup lang="ts">
import {computed, nextTick, reactive, ref} from "vue";
import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import api, {baseUrl} from "@/utils/api";
import {getTimeByStr} from '@/utils/tools'

const data = ref()
const id = ref()

// markdown的html内容
let content = ref('')

const userData = reactive({})

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
  userData.value = res.userInf
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


const imgUrl = computed(() => {
  return baseUrl + userData.value.avatar;
})

</script>

<style scoped lang="less">
.read{
  background: @borderColor;
  min-height: 100vh;
  .padding-top-l();
}
.content, .userCard{
  background: white;
  border-radius: @radio-m;
  margin-bottom: @margin-m;
  .margin-lr-10();
  box-sizing: border-box;
  font-size: 30rpx;
  font-family: "PingFang SC";
}
.userCard{
  padding: @padding-l;
}
</style>
