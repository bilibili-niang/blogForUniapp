<script setup>
import {ref} from 'vue'

const props = defineProps({
  maskClick: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: 'rgb(0,0,0,.3)'
  }
})
const popupRef = ref()
const open = (direction='bottom') => {
  popupRef.value?.open(direction)
}

const close = () => popupRef.value?.close()

defineExpose(['open','close'])
</script>

<template>
  <uni-popup ref="popupRef" :mask-click="maskClick" :background-color="backgroundColor">
    <slot></slot>
  </uni-popup>
</template>

<style scoped lang="less">

</style>