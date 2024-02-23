<template>
  <customNavBar :back="false" title="首页"></customNavBar>
  <view class="container">
    <recommendMarkdown :list="loopItem" :activeIndex="activeIndex"></recommendMarkdown>
    <!--分类-->
    <!--<classify :item="classifyItem"></classify>-->
  </view>
  <!--<tabBar/>-->
</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import {ref} from "vue";
import api from "@/utils/api";
import RecommendMarkdown from "@/pages/index/components/recommendMarkdown.vue";
import {onPullDownRefresh} from "@dcloudio/uni-app";

let loopItem = ref<any>([])
const activeIndex = ref(0)

const content = ref('')

// 下拉触发获取随机文章
onPullDownRefresh(() => {
  random()
})

// 分类列表
const classifyItem = ref<any>([])

// 随机的一条数据
const randomOne = ref()

// 初始化方法
const init = async () => {
  const res = await api.homeRecommend()
  loopItem.value = res.result
  const tags = await api.allTags()
  classifyItem.value = tags.result
  await random();
}

const random = async () => {
  const random = await api.getRandomOne()
  if (random) {
    uni.stopPullDownRefresh();
  }
  randomOne.value = random.result
  const contentTemp = await api.getMarkdownContent({id: randomOne.value.id})
  if (contentTemp.success) {
    content.value = contentTemp.result + ''
  }
}

init()
</script>
<style scoped lang="less">
.container{
  padding-bottom: 10vh;
}

.content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: @bacColor-bleak;
}

.text-area{
  display: flex;
  justify-content: center;
}

.description{
  margin-bottom: @margin-l;
}

.item{
  .flex-row();
  width: 100%;
  justify-content: space-evenly;
}

</style>
