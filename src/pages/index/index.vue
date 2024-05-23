<template>
  <div class="indexPage">
    <div class="ice-column" v-if="!userInfo">
      请前往登陆
      <CustomButton @click="goLogin">
        登陆页
      </CustomButton>
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
import { globalStore, useMemberStore } from '@/stores'
import { ref } from 'vue'
import CustomButton from '@/components/common/customButton/index.vue'

const memberStore = useMemberStore()
const userInfo = ref(memberStore.$state.profile || '')
if (memberStore.$state.profile) {
  uni.showTabBar()
}

const global = globalStore()
const goLogin = () => {
  /*uni.switchTab({
    url: '/pages/mine/index'
  })*/
  global.changePage('4')
}
</script>

<style scoped lang="less">

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
