<template>
  <view class="recommendMarkdown">
    <view v-for="(item,index) in list" :key="index">
      <view class="item">
        <view class="tag">
          <uni-tag :inverted="true" text="title" type="primary"/>
        </view>
        <!--        <view class="btn">-->
        <button size="mini">
          {{ item.title }}
        </button>
        <!--        </view>-->
      </view>
      <!--      {{ item }}-->
    </view>

  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>

<style scoped lang="less">

.recommendMarkdown {
  .item {
    .flex-row();
    align-items: center;
    margin-top: @margin-m;
    margin-bottom: @margin-m;

    .tag {
      min-width: 15vw;
    }

    button {
      padding-left: 10rpx;
      margin-left: 0;
    }

    /*    .btn {
          display: flex;
          width: 60vw;
          justify-content: flex-start;
        }*/
  }
}

</style>
