<template>
  <view class="login">
    <view class="title">
      环卫巡查端
    </view>
    <view class="imgLim">
      <img src="https://blog.icestone.work/cloud.png" alt="" class="iconPng">
    </view>
    <view class="formControl">
      <view class="forInputItem">
        <view class="formTitle">
          账号
        </view>
        <uni-easyinput class="uni-mt-5 input" trim="all" v-model="accountVal" placeholder="请输入账号"></uni-easyinput>
      </view>

      <view class="forInputItem">
        <view class="formTitle">
          密码
        </view>
        <uni-easyinput class="uni-mt-5 input" trim="all" v-model="passwordVal" placeholder="请输入密码"></uni-easyinput>
      </view>
      <button class="mainBtn" @tap="login">
        登录
      </button>
      <text>
        {{ md5Password }}
      </text>
      <button class="mainBtn" @tap="goIndex">
        go index
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">

import {ref} from "vue";
import api from "@/utils/api";
import {useMemberStore} from "@/stores";
import md5 from "js-md5";

let accountVal = ref('ceshi')
let passwordVal = ref('123456')
const memberStore = useMemberStore()

/**
 * 登录
 */
const login = async () => {
  const res = await api.login({
    Name: accountVal.value,
    Password: md5(passwordVal.value)
  })
  if (res.success) {
    memberStore.setProfile({
      Name: res.Name,
      Token: res.Token
    })
    uni.setStorageSync('TOKEN', res.Token)
    uni.showToast({
      icon: 'success',
      title: '登录成功'
    })
    uni.navigateTo({
      url: '/pages/index/index'
    });
  }
}
const goIndex = () => {
  uni.navigateTo({
    url: '/pages/index/index'
  });
}
</script>

<style scoped lang="less">
.login {
  margin-top: 10vh;

  .title {
    font-size: 55rpx;
    color: @fontColor-dark;
    .flex-center();
  }

  .imgLim {
    margin-top: 50rpx;
    margin-bottom: 50rpx;
    .flex-center();

    .iconPng {
      width: 170rpx;
      margin: 0 auto;
    }
  }

  .formControl {
    .padding-lr-20();
    .flex-row(column);

    .forInputItem {
      .flex-row();
      margin-top: @margin-m;

      .formTitle {
        font-size: @fontSize-m;
        .flex-center();
      }

      .input {
        margin-left: @margin-ls;
      }
    }
  }

  .mainBtn {
    .btnMaxWidth();
    margin-top: @margin-m;
  }
}

</style>
