<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "userDetail"
})
</script>
<script setup lang="ts">
import {defineProps, computed, ref} from 'vue';
import {baseUrl} from "@/utils/api";

const props = defineProps({
  data: {
    type: Object,
    default: {name: '张三', age: 18}
  }
})

const imgUrl = computed(() => {
  return baseUrl + props.data.avatar
})
// 弹窗
const showPopup = ref(false);
const close = () => {
  showPopup.value = !showPopup.value;
}
// 退出登陆
const logOut = () => {
// 清除token
  try {
    uni.removeStorage({
      key: 'user',
      success: function (res) {
        uni.showToast({
          title: '退出登陆成功',
          icon: 'success'
        })
        // 重启
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index'
          })
        }, 2000)
      }
    });

    uni.removeStorage({
      key: 'token',
      success: function (res) {
      }
    });

    uni.removeStorage({
      key: 'member',
      success: function (res) {
      }
    });
  } catch (e) {
    console.log(e)
  }
}

// 查看头像
const avatarClick = () => {
  uni.previewImage({
    current: 0,
    urls: [imgUrl.value]
  });
}

</script>

<template>
  <div class="userInfo">
    <div class="ice-column">

      <div class="ice-row margin-top-s margin-lr-10">
        <up-image :show-loading="true" :src="imgUrl" width="80px" height="80px"
                  @click="avatarClick" shape="circle"></up-image>
        <div class="ice-column">
          <div class="ice-text">
            <div class="ice-tag">昵称:</div>
            {{ data.username }}
          </div>
          <div class="ice-text">
            <div class="ice-tag">职业:</div>
            {{ data.occupation }}
          </div>
        </div>
      </div>

      <div class="ice-row-reverse bottom-themeColor">
        <div class="ice-row">
          <u-button class="btnWidth" text="设置" @click="showPopup = true"></u-button>
        </div>
      </div>

    </div>
  </div>

  <u-popup :show="showPopup" mode="top" safeAreaInsetTop :round="10" @close="close" @open="open">
    <view>
      <div class="ice-row-reverse bottom-themeColor">
        <div class="ice-row">
          <u-button class="btnWidth" text="退出登陆" @click="logOut"></u-button>
        </div>
      </div>
    </view>
  </u-popup>


</template>

<style scoped lang="less">

</style>