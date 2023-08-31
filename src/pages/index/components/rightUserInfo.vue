<template>
  <view class="rightUserInfo" @click="toggle('top')">
    <img :src="userInfo.avatar" alt="" class="avatar">
    <view class="text">
      <text>{{ userInfo.nickName }}</text>
    </view>

    <uni-popup ref="popup" type="center">
      <view class="popupLim">
        <button @tap="cleanLogin" class="mainBtn">
          退出登录
        </button>
        <button @tap="goLoginPage" class="mainBtn">
          login page
        </button>

      </view>

    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMemberStore} from "@/stores";

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const type = ref('center')
const popup = ref(null)
const toggle = (typeVal: string) => {
  type.value = typeVal
  // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
  popup.value?.open(typeVal)
}

const memberStore = useMemberStore()
/**
 * 退出登录
 */
const cleanLogin = () => {
  // 清除本地用户信息
  memberStore.clearProfile()
  // 返回到登录页
  uni.navigateTo({
    url: '/pages/login/index'
  });
}
const goLoginPage = () => {
  // 返回到登录页
  uni.navigateTo({
    url: '/pages/login/index'
  });
}

</script>

<style scoped lang="less">
.rightUserInfo {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  align-items: center;
  justify-content: center;

  .avatar {
    display: flex;
    width: 70rpx;
    height: 70rpx;
    border-radius: 10rpx;
  }

  .text {
    font-size: 30rpx;
    display: flex;
    margin-left: 10rpx;

    /deep/ span {
      white-space: nowrap;
    }
  }
}

// 弹出层
.popupLim {
  padding-top: @padding-m;
  margin-top: @margin-m;
  .padding-lr-20();
  background: @bacColor;
  border-radius: @radio-m;
  padding-bottom: 10vh;

  .mainBtn {
    max-width: 220rpx;
    margin-top: @margin-m;
  }
}
</style>
