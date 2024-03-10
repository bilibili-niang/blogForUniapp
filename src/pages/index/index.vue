<template>
  <customNavBar :back="false" title="首页"></customNavBar>
  <view class="container">
    <!--<recommendMarkdown :list="loopItem" :activeIndex="activeIndex"></recommendMarkdown>-->
    <!--分类-->
    <!--<classify :item="classifyItem"></classify>-->
  </view>
  <!--<tabBar/>-->
  <template v-for="(item,index) in dataList" :key="index">
    <div v-if="item.type==='music'" class="cardLim">
      <musicCard :item="item"></musicCard>
      <div class="ice-column">
        <up-text :text="item.title+'-'+item.author"></up-text>
        <up-text :text="item.descriptions"></up-text>
      </div>
    </div>

  </template>

</template>

<script setup lang="ts">
import CustomNavBar from "@/pages/index/components/customNavBar.vue";
import {ref} from "vue";
import api from "@/utils/api";
import {onPullDownRefresh} from "@dcloudio/uni-app";
import MusicCard from "@/pages/index/components/music/index.vue";

let loopItem = ref<any>([])

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


let dataList = [
  {
    url: "/collectible/ding.png",
    id: 1,
    type: "card",
    title: "群 丁真",
    descriptions: "二十一世纪的理塘王,曾有无数人挑战丁真的地位,但都在他的雪豹面前败下阵来.成名绝技:闭嘴,雪豹"
  },
  {
    url: "/collectible/gotSmoke.mp3",
    id: 2,
    type: "music",
    title: "I Got Smoke",
    author: "V在燃烧",
    authorUrl: "/",
    coverImg: "collectible/1.png",
    descriptions: "你拿什么和我丁真拼?"
  },
  {
    url: "/collectible/video2.mp4",
    id: 2,
    type: "music",
    title: "如翁",
    author: "石岩",
    authorUrl: "/",
    coverImg: "collectible/2.png",
    descriptions: "没有小众的音乐，只有迟到的听众"
  },
];

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
