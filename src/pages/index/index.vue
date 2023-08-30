<template>
  <view class="content">
    <text>当前登录用户信息:</text>
    <text>
      {{ memberStore.profile }}
    </text>
    <button @tap="memberStore.setProfile({
    nickname:'测试用户名',
    token:'1234567890'
    })">set token
    </button>
    <button @tap="memberStore.clearProfile()">清空</button>
    <button @tap="requestTest">请求</button>
    <button @tap="requestTestFail">失败请求</button>
  </view>
</template>

<script setup lang="ts">
import {useMemberStore} from "@/stores";
import {ref} from 'vue'
import api from "@/utils/api";

const memberStore = useMemberStore()

const title = ref('Hello')
/**
 * 获取首页数据
 */
const requestTest = async () => {
  const res = await api.home()
  console.log(res)
}
const requestTestFail = async () => {
  const res = await api.homeFail()
  if (res.success) {
    console.log(res)
  } else {
    console.log('fail')
  }
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
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
