<template>
  <view class="content">
    <navBar title="首页"></navBar>
    <view class="container">
      <view class="textContainer">
        <button class="mainBtn" @tap="manualClean">
          人工保洁
        </button>
      </view>

      <view class="textContainer">
        <button class="mainBtn" @tap="machineClean">
          机械化作业
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import NavBar from "./components/navBar.vue";
/**
 * 跳转,机械化作用
 */
const machineClean = () => {
  uni.navigateTo({
    url: '/pages/machineClean/index'
  });
}

/**
 * 跳转,人工保洁
 */
const manualClean = () => {
  uni.navigateTo({
    url: '/pages/manualClean/index'
  });
}

</script>

<style scoped lang="less">
.content {
  .container {
    margin-top: 10vh;
    .flex-row(column);
    justify-content: space-around;
    .padding-lr-20();

    .textContainer {
      margin-top: @margin-m;
      .flex-row(column);
      border-radius: 30rpx;
      border: 1px solid rgba(0, 0, 0, .6);
      width: 100%;
      height: 25vh;

      .mainBtn {
        border-radius: 30rpx;
        border: none;
        width: 100%;
        height: 100%;
        .flex-center();
      }
    }
  }
}
</style>
