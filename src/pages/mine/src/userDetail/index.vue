<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "userDetail"
})
</script>
<script setup lang="ts">
import {defineProps, computed} from 'vue';
import {baseUrl} from "@/utils/api";

const props = defineProps({
  data: {
    type: Object,
    default: {name: '张三', age: 18}
  }
})
const avatarClick = () => {

}

const imgUrl = computed(() => {
  return baseUrl + props.data.avatar
})
</script>

<template>
  <div class="userInfo">
    <div class="ice-row margin-top-s margin-lr-10">

      <up-image :show-loading="true" :src="imgUrl" width="80px" height="80px"
                @click="avatarClick" shape="circle"></up-image>
      <div class="ice-column">
        <div class="ice-text">
          <div class="ice-tag">昵称:</div>
          {{ data.username }}
        </div>
        <div class="ice-text">
          <div class="ice-tag">职业:</div>
          {{ data.occupation }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>