<template>
  <view class="addEvents">
    <view class="formLim">
      <view class="formItem">
        <view class="title">
          今日时间
        </view>

        <view class="time">
          {{ time }}
        </view>
      </view>

      <view class="formItem">
        <view class="title">
          content
        </view>

        <view class="time">
          <uni-easyinput type="textarea" v-model="content" placeholder="请输入内容"></uni-easyinput>

        </view>
      </view>

    </view>

  </view>
  <tabBar/>
</template>

<script setup lang="ts">

import {ref} from "vue";
import dayjs from "dayjs";

const now = dayjs();


const time = ref('')
const content = ref('')

const init = () => {
  const year = now.year();
  const month = now.month() + 1; // 月份是从 0 开始的，所以需要加 1
  const date = now.date();
  const hours = now.hour();
  const minutes = now.minute();
  const seconds = now.second();
  time.value = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

init()
</script>

<style scoped>

</style>
