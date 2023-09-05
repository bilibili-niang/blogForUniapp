<template>
  <customNavBar :back="false" title="首页"></customNavBar>
  <iceSwiper :list="loopItem" @index="getIndex"></iceSwiper>
  <view class="container">
    <recommendMarkdown :list="loopItem"></recommendMarkdown>
    <!--分类-->
    <classify :item="classifyItem"></classify>

    <view class="content">

      <markdownCon :item="randomOne"></markdownCon>

    </view>

  </view>
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import IceSwiper from "./components/iceSwiper.vue";
import {ref} from "vue";
import api from "@/utils/api";
import RecommendMarkdown from "@/pages/index/components/recommendMarkdown.vue";
import Classify from "@/pages/index/components/classify.vue";
import MarkdownCon from "@/components/common/markdownCon.vue";

let loopItem = ref<any>([])
const getIndex = (id: number) => {
  // console.log(`前激活id: ${id}`)
}
// 首页推荐列表
const recommendList = ref([])

// 分类列表
const classifyItem = ref<any>([])

// 随机的一条数据
const randomOne = ref()

// 初始化方法
const init = async () => {
  const res = await api.homeRecommend()
  loopItem.value = res.result
  console.log(loopItem)
  const tags = await api.allTags()
  classifyItem.value = tags.result

  const random = await api.getRandomOne()
  randomOne.value = random.result

}

init()
</script>
<style scoped lang="less">
.container {
  padding-bottom: 10vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
