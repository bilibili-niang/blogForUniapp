<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    disabled: { // 更改为disabled以遵循Vue的约定
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  emits: ['click'], // 声明会发出的自定义事件
  setup(props, { emit }) {
    const buttonStyle = computed(() => {
      return {
        color: props.color
      }
    })

    const handleClick = () => {
      if (!props.disabled) {
        emit('click') // 触发click事件
      }
    }

    return { buttonStyle, handleClick }
  }
})
</script>

<template>
  <div :class="['customButton', { disable: disabled }]" :style="buttonStyle" @click="handleClick">
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
  background: @themeActiveColor;
  color: inherit;
  margin: @margin-s;
}

.disable {
  opacity: .4;
  cursor: not-allowed;
}
</style>