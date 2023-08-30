<template>
  <view class="content">
    <navBar title="首页"></navBar>
    <view class="context">
      <view class="roundText">
        <navigator url="../manualClean/index">人工保洁</navigator>
      </view>
      <view class="roundText">
        <navigator url="../machineClean/index">机械化作业</navigator>
      </view>
    </view>

  </view>
</template>

<script>
import NavBar from '@/components/common/navBar.vue'

export default {
  components: { NavBar },
  data () {
    return {}
  },
  onLoad () {

  },
  methods: {}
}
</script>

<style lang="less">
.flex-row(@direction: row) {
  display: flex;
  flex-direction: @direction;
}

.content {
  .flex-row(column);

  .context {
    .flex-row(column);
    width: 100%;
    padding-top: 25vh;

    .roundText {
      margin-top: 100rpx;
      .flex-row();
      justify-content: center;
      align-items: center;
      height: 100rpx;
      padding: 10rpx;
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      border-radius: 10rpx;
      border: 1px solid rgba(0, 0, 0, .4);
    }
  }
}
</style>
