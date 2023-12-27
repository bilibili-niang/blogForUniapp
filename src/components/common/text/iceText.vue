<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "iceText"
})
</script>

<template>
  <div class="iceText">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.iceText {
  font-size: @fontSize-m;
  color: @fontColor;
}
</style>