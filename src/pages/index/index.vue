<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <uni-card title="用户信息" extra="额外信息">
      <text>
        {{ memberStore.profile }}
      </text>
    </uni-card>
    <button @tap="memberStore.setProfile({
    nickname:'测试用户名',
    token:'1234567890'
    })">set token</button>
    <button @tap="memberStore.clearProfile()">清空</button>
    <button @tap="requestTest">请求</button>
  </view>
</template>

<script setup lang="ts">
import {useMemberStore} from "@/stores";
import {ref} from 'vue'
import api from "@/utils/api";

const memberStore = useMemberStore()

const title = ref('Hello')
const requestTest = async () => {
  const res = await api.home()
  console.log(res)
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.text-area {
  display: flex;
  justify-content: center;

}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
