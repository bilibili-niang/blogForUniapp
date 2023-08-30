<template>
  <view class="login">
    <view class="title">
      环卫巡查端
    </view>
    <img src="http://localhost:89/cloud.png" class="loginLogo">
    <view class="formControl">
      <view class="account">
        <view class="text">
          账号
        </view>
        <view class="inputLim">
          <uni-easyinput class="uni-mt-5" trim="all" v-model="account" placeholder="请输入账号"></uni-easyinput>
        </view>
      </view>
      <view class="password">
        <view class="text">
          密码
        </view>
        <view class="inputLim">
          <uni-easyinput class="uni-mt-5" trim="all" v-model="password" placeholder="请输入密码"></uni-easyinput>
        </view>
      </view>
      <view class="btns">
        <view class="submit" @tap="loginSubmit">
          <navigator url="/pages/index/index">登录</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

/**
 * 登录跳转
 */
const loginSubmit = () => {
  if (account.value === '123456' && password.value === '123456') {
    uni.setStorage({
      key: 'token',
      data: 'hello',
      success: function () {
        uni.navigateTo({
          url: '/pages/index/index'
        })
      }
    });
  } else {
    console.log('账户密码错误')
  }
}
/**
 * 账号,密码
 */
const account = ref<String>('')
const password = ref<String>('')

const initJump = () => {
  let token = uni.getStorageSync("token")
  if (token) {
    uni.navigateTo({
      url: '/pages/index/index'
    })
  }
}
initJump()
</script>

<style scoped lang="less">
@radio: 10rpx;
@borderColor: rgba(0, 0, 0, .5);

.flex-row(@direction: row) {
  display: flex;
  flex-direction: @direction;
}

.login {
  .flex-row(column);
  align-items: center;

  .title {
    width: 100%;
    .flex-row();
    justify-content: center;
    align-items: center;
    font-size: 50rpx;
    color: rgba(0, 0, 0, .7);
    margin-top: 100rpx;
    margin-bottom: 100rpx;
  }

  .loginLogo {
    .flex-row();
    width: 200rpx;
    height: 200rpx;
  }

  .formControl {
    .flex-row(column);

    .account, .password {
      .flex-row();
      align-items: center;
      margin-top: 40rpx;

      .inputLim {
        margin-left: 20rpx;
        width: 500rpx;

        input {
          .flex-row();
          border: 1px solid @borderColor;
          height: 70rpx;
          border-radius: @radio;
        }
      }
    }

    .btns {
      .flex-row();
      width: 100%;
      justify-content: center;
      margin-top: 100rpx;

      .submit {
        border: 1px solid @borderColor;
        padding: 20rpx;
        width: 150rpx;
        justify-content: center;
        .flex-row();
        border-radius: @radio;
      }
    }
  }
}
</style>
