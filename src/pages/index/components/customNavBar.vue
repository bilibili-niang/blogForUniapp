<!--自定义navBar-->
<template>
  <div class="navBar" :style="{'padding-top':safeAreaInsets?.top+'px'}">
    <uni-nav-bar dark shadow left-icon="left" leftText="返回" rightText="设置"
                 title="自定义高度"/>
  </div>

</template>

<script setup lang="ts">
// 获取屏幕边界到安全区域的距离
const {safeAreaInsets} = uni.getSystemInfoSync()

</script>

<style scoped lang="less">

</style>
