<template>
  <view class="mine">
    <div class="ice-text">选择一个登录方式</div>
    <uni-data-select
        v-model="loginType"
        :localdata="loginData"
        @change="typeChange"
        :clear="false"
    ></uni-data-select>

    <div class="columnBlock"></div>
    <div class="loginForm" v-if="loginType===0">
      <uni-easyinput v-model="account.username" placeholder="账户"></uni-easyinput>
      <div class="columnBlock"></div>
      <uni-easyinput type="password" v-model="account.password" placeholder="密码"></uni-easyinput>
      <div class="columnBlock"></div>
      <div class="mainBtn login" @click="accountbyLogin">登录</div>

    </div>

    <div v-else>
      <view class="mainBtn" @tap="login">
        login
      </view>
      <!--{{ openIdList }}:-->
      <view class="openIdList">
        <view class="item">

        </view>
      </view>
    </div>


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

let account = ref({
  username: '',
  password: ''
})

let loginType = ref(0)
const loginData = ref([
  {value: 0, text: "账户登录"},
  {value: 1, text: "微信登录"},
])
const typeChange = (e) => {
  console.log(e)
}
const accountbyLogin = () => {

}
</script>

<style scoped lang="less">
.mine{
  padding: @padding-m;
}

</style>
