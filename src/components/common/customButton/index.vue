<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  setup(props) {
    const buttonStyle = computed(() => {
      return {
        color: props.color
      }
    })

    return { buttonStyle, props }
  }
})
</script>

<template>
  <div :class="['customButton', props.disable ? 'disable' : '']" :style="buttonStyle">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.customButton {
  display: flex;
  width: fit-content;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: @padding-s @padding-m;
  border-radius: @radio-m;
  background: @button-bac; /* 确保@button-bac在你的less变量中已定义 */
  color: inherit; /* 或具体颜色值，如果希望通过计算属性设置则无需这行 */
  margin: @margin-s;
}

.disable {
  opacity: .4;
  cursor: not-allowed;
}
</style>