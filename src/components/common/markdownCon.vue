<template>
  <!--  markdown文章预览并渲染-->
  <view class="markdownCOn">
    <view class="MarkdownDetail">
      <view class="item title">{{ item.title }}</view>
      <view class="item">{{ item.description }}</view>
      <view class="item">{{ item.updatedAt }}</view>
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

<style scoped>

</style>
