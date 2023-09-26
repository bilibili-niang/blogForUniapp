<template>
  <view class="mine">
    <view class="mainBtn" @tap="login">
      login
    </view>

    <view class="data">
      {{ code }}
    </view>

    <!--{{ openIdList }}:-->
    <view class="openIdList">
      <view class="item" v-for="(item,index) in openIdList" :key="index">

        {{ item }}

      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import api from "@/utils/api";

let userInfo = ref()

let code = ref()
let openIdList = reactive([])

const login = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    onlyAuthorize: true,
    success: async function (loginRes) {
      code.value = loginRes.code
      const res = await api.login({
        code: code.value
      })
      console.log(res)
      openIdList.push(res.result)
      // api.

    },
    fail: function (err) {
      console.log('err')
      console.log(err);
    }
  })
}

let rawData = ref("")
const getInfo = () => {
  uni.getUserProfile({
    desc: '请登录',
    lang: 'zh_CN',
    fail: function (res) {
      console.log('登录失败')
      console.log(res);
    },
    success: async function (res) {
      console.log('res')
      console.log(res)
      console.log('res.rawData')
      console.log(res.rawData)
      rawData.value = JSON.parse(res.rawData)
    }
  })
}


</script>

<style scoped lang="less">
.mine {
  padding: @padding-m;
}

</style>
