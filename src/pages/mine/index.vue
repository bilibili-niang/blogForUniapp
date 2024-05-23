<template>
  <view class="mine">
    <userDetail :data="userInfo" v-if="userInfo"/>
    <!--没有用户登陆时-->
    <div class="ice-column" v-else>
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
        <CustomButton :disabled="allowClick" @click="login">
          登录
        </CustomButton>
      </div>
    </div>

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/utils/api'
import verifyTools from '@/utils/verify'
import { useMemberStore } from '@/stores/index'
import userDetail from './src/userDetail/index.vue'
import CustomButton from '@/components/common/customButton/index.vue'

const memberStore = useMemberStore()

let code = ref()

const userInfo = ref()

// 微信登陆
const login = () => {
  allowClick.value = true
  uni.login({
    provider: 'weixin',
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
        uni.showTabBar()
        uni.showToast({
          title: '登录成功',
          icon: 'none'
        })
      } else {
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    },
    fail: function (err) {
      allowClick.value = false
    }
  })
}

let accountForm = ref({
  username: '',
  password: ''
})

// 控制是否可以点击登录
let allowClick = ref(false)
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


// 通过openId重新获取token
const loginByToken = async () => {
  uni.getStorage({
    key: 'token',
    success: async function (res) {
      res.data ? login() : ''
    }
  })
}

loginByToken()

// 存储登陆方式
const isWeixin = ref(false)
// #ifdef MP-WEIXIN
console.log('微信平台')
isWeixin.value = true
// #endif

</script>

<style scoped lang="less">
.mine {
  padding: @padding-m;
}

</style>
