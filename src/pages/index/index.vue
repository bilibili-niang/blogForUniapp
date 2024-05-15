<template>
  <div class="indexPage">
    <div class="ice-column" v-if="!userInfo">
      请前往登陆
      <u-button text="登陆页" @click="goLogin"></u-button>
    </div>
    <div class="ice-column" v-else>
      <div class="ice-column" v-if="userInfo">
        统计概览
statistics

      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { ref } from 'vue'

const memberStore = useMemberStore()
const userInfo = ref(memberStore.$state.profile || '')
if (memberStore.$state.profile) {
  uni.showTabBar()
}
const goLogin = () => {
  uni.switchTab({
    url: '/pages/mine/index'
  })
}
</script>

<style scoped lang="less">
.indexPage {
}

.list {
  display: grid;
  grid-template-columns: 160px 160px;
}

.item-left {
  width: 180px;
}

.item-date-time {
  display: flex;
  justify-content: flex-end;
}
</style>
