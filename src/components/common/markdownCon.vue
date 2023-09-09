<template>
  <!--  markdown文章预览并渲染-->
  <view class="markdownCon">
    <view class="MarkdownDetail">
      <view class="item title">title>
        <br>
        {{ item.title }}
      </view>
      <view class="item des">描述:
        {{ item.description }}
      </view>
      <view class="item time">{{ item.updatedAt }}</view>
    </view>
    <br>
    <view class="content">
      content:{{ item.content }}
    </view>

    <!--{{ item }}-->
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

</script>

<style scoped lang="less">
.markdownCon {
  .MarkdownDetail {
    .flex-row(column);

    .item {
      white-space: pre-wrap;
    }

    .title, .des, .time {
      margin-bottom: @margin-m;
    }
  }
}
</style>
