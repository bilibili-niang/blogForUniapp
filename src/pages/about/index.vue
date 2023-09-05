<template>
  <!--tag的关于页面-->
  <view class="about">
    <view class="title">
      关于:
      <uni-tag :inverted="true" :text="tag" type="primary"/>
      的文章:
    </view>

    <view class="context">
      <view v-if="data">
        <view class="itemLim" v-for="(item,index) in data" :key="index">
          <view class="cover" :style="{
        'background':`url(https://blog.icestone.work${item.headImg})`
      }"></view>
          <view class="item">
            <uni-tag :inverted="true" :text="item.id+''" type="primary"/>
            <uni-tag :inverted="true" :text="item.title" type="primary"/>
          </view>
          <view class="des">
            {{ item.description }}
          </view>
          <view class="operate">
            <button @tap="goToRead(item.id)" size="mini">read</button>
          </view>

        </view>
      </view>
    </view>
    <!--    data:{{ data }}-->
  </view>
</template>

<script setup lang="ts">

import {onLoad, onPullDownRefresh} from "@dcloudio/uni-app";
import {nextTick, ref} from "vue";
import api from "@/utils/api";

let tag = ref('')
const data = ref()
const init = async () => {
  onLoad((opt: any) => {
    tag.value = opt.value
    uni.setStorageSync('tags', opt.value)
  })
  tag.value = uni.getStorageSync("tags")
  // 这里tag只有一个
  const res = await api.aboutTags({tags: [tag.value]})
  data.value = res.result
  console.log(data.value)
  uni.stopPullDownRefresh();
}

// 跳转阅读
const goToRead = (id: number) => {
  uni.setStorageSync('readId', id)
  uni.navigateTo({
    url: `/pages/read/index?readId=${id}`
  })
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
.about {
  .padding-lr-20();

  .context {
    .itemLim {
      margin-top: 50rpx;
      background: @bacColor-bleak;
      border-radius: @radio-ls;
      padding: @padding-s;
      position: relative;
      background: @bacColor-bleak;

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        filter: blur(10px);
        z-index: -1;
        opacity: 0;
      }

      .item {
        .flex-row();
        margin-top: @margin-s;
        justify-content: space-between;
        margin-bottom: @margin-l;
      }

      .operate {
        .flex-row();
        width: 100%;
        justify-content: flex-start;
        margin-top: @margin-m;

        /deep/ button {
          margin: 0;
        }
      }

    }
  }
}
</style>
