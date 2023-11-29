<template>
  <view class="mine">
    <div class="ice-text">
      暂未开放,sorry
    </div>

    <!--    <view v-if="!userInfo">
          数据为空
        </view>
        <view class="mainBtn" @tap="login">
          login
        </view>

        &lt;!&ndash;{{ openIdList }}:&ndash;&gt;
        <view class="openIdList">
          <view class="item">

            {{ openIdList }}

          </view>
        </view>-->

  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import api from "@/utils/api";

let code = ref()

const userInfo = ref()
const login = () => {
  uni.login({
    provider: 'weixin', //使用微信登录
    onlyAuthorize: true,
    success: async function (loginRes) {
      code.value = loginRes.code
      const res = await api.login({
        code: code.value
      })
      if (res.success) {
        userInfo.value = res.result
        delete res.result.realPassword
        uni.setStorageSync('user', res.result)
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: '登录失败',
          icon: 'error'
        })
      }
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
.mine{
  padding: @padding-m;
}

</style>
