<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: 'fit-content'
  },
  weight: {
    type: String,
    default: '400'
  },
  color: {
    type: String,
    default: '#333'
  }
})

const style = computed(() => {
  const { width, weight, color } = props
  return {
    width,
    fontWeight: weight,
    color
  }
})
</script>

<template>
  <div class="iceText" :style="style">
    <slot/>
  </div>
</template>

<style scoped lang="less">
.iceText {
  font-size: @fontSize-m;
  color: @fontColor;
}
</style>