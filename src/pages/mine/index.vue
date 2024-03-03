<template>
  <view class="mine">


    <div class="columnBlock"></div>
    <div class="columnBlock"></div>

    <!--使用账户密码登陆-->
    <div v-if="!isWeixin">
      <uni-easyinput v-model="accountForm.username" placeholder="账户"></uni-easyinput>
      <uni-easyinput type="password" v-model="accountForm.password" placeholder="密码"></uni-easyinput>
      <div class="columnBlock"></div>
      <div class="mainBtn login" @click="accountbyLogin">登录</div>
      <div class="mainBtn login" @click="loginByToken">byToken</div>
    </div>

    <!--使用微信登陆-->
    <div class="column justC" v-if="isWeixin">
      <div class="ice-text">
        通过微信登录
      </div>
      <div class="blockLine"></div>
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
import verifyTools from '@/utils/verify/index.js'
import piniaStore from '@/stores/index'

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
      rawData.value = JSON.parse(res.rawData)
    }
  })
}

let accountForm = ref({
  username: '',
  password: ''
})

// 控制是否可以点击登录
let allowClick = ref(true);
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
          const userInfo = await api.getUserInfoByToken(tokenStr);
          console.log("userInfo:")
          console.log(userInfo.result.res);
          // 写入pinia
          console.log("piniaStore")

          console.log(piniaStore);


          /*if (userInfo.success) {
            accountModel = userInfo.result.res;
          }*/

        }

      }
    });
  } catch (e) {
    console.log(e)
  }
}

// 存储登陆方式
const isWeixin = ref(false);
// #ifdef MP-WEIXIN
isWeixin.value = true;

</script>

<style scoped lang="less">
.mine{
  padding: @padding-m;
}

</style>
