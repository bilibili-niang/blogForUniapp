<template>
  <view class="mine">
    <div class="ice-column" v-if="userInfo">
      <userDetail :data="userInfo"/>
      <div class="columnBlock"></div>
    </div>
    <!--没有用户登陆时-->
    <div class="ice-column" v-if="!userInfo">
      <!--使用账户密码登陆-->
      <div v-if="!isWeixin">
        <uni-easyinput v-model="accountForm.username" placeholder="账户"></uni-easyinput>
        <uni-easyinput type="password" v-model="accountForm.password" placeholder="密码"></uni-easyinput>
        <div class="columnBlock"></div>
        <div class="mainBtn login" @click="accountbyLogin">登录</div>
        <div class="mainBtn login" @click="loginByToken">byToken</div>
      </div>

      <!--使用微信登陆-->
      <div class="column justC" v-else>
        <up-text text="通过微信登录"></up-text>
        <div class="blockLine"></div>
        <up-button class="mainBtn" text="登录" @click="login" :disabled="allowClick"></up-button>
      </div>
    </div>

  </view>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import api from "@/utils/api";
import verifyTools from '@/utils/verify/index.js'
import {useMemberStore} from '@/stores/index'
import userDetail from './src/userDetail/index.vue'

const memberStore = useMemberStore();

let code = ref()

const userInfo = ref()

// 微信登陆
const login = () => {
  allowClick.value = true
  uni.login({
    provider: 'weixin', //使用微信登录
    onlyAuthorize: true,
    success: async function (loginRes) {
      allowClick.value = false
      code.value = loginRes.code
      const res = await api.login({
        code: code.value
      })
      if (res.success) {
        userInfo.value = res.result
        uni.setStorageSync('user', res.result)
        uni.setStorageSync('token', res.result.token)
        // 写入pinia
        memberStore.setProfile(res.result)
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
      allowClick.value = false
      console.log('err')
      console.log(err);
    }
  })
}

let accountForm = ref({
  username: '',
  password: ''
})

// 控制是否可以点击登录
let allowClick = ref(false);
// 账户密码登陆
const accountbyLogin = () => {
  const verifyRes = verifyTools.commonVerify({
    username: {
      allowNull: false,
      default: null
    }, password: {
      allowNull: false,
      default: null
    },
  }, accountForm.value)
  if (verifyRes) {
    allowClick.value = false
    // 发起登录请求
    api.loginByAccount(accountForm.value).then(res => {
      console.log(res)
      if (res.success) {
        // 登录成功
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 将 res.result 写入token
        uni.setStorageSync('token', res.result.token)
        uni.setStorageSync('user', res.result)
        allowClick.value = true
      } else {
        // 登录失败
        uni.showToast({
          title: '登录失败',
          icon: 'error'
        })
        allowClick.value = true
      }
    })
  } else {
    // 报错,请填写完整信息
    uni.showToast({
      title: '请填写完整信息',
      icon: 'error'
    })
  }

}


// 通过本地token登录，登录成功将数据写入pinia
const loginByToken = async () => {
  try {
    // 从localStorage中获取token
    let tokenStr = ""
    uni.getStorage({
      key: 'token',
      success: async function (res) {
        tokenStr = res.data + '';
        if (tokenStr) {
          // 假设这里有一个函数getUserInfoByToken用于通过token获取用户信息
          const data = await api.getUserInfoByToken(tokenStr);
          userInfo.value = data.result.res;
          // 写入pinia
          memberStore.setProfile(data.result.res)
        }

      }
    });
  } catch (e) {
    console.log(e)
  }
}

loginByToken();

// 存储登陆方式
const isWeixin = ref(false);
// #ifdef MP-WEIXIN
console.log("微信平台")
isWeixin.value = true;
// #endif
const loginState = computed(() => {
  return !!uni.getStorageSync('token')
})
</script>

<style scoped lang="less">
.mine{
  padding: @padding-m;
}

</style>
