<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "userDetail"
})
</script>
<script setup lang="ts">
import {defineProps, computed, ref} from 'vue';
import api, {baseUrl} from "@/utils/api";

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

// 成为admin!
const beAdmin = async () => {
  await api.becomeAdmin()
      .then(res => {
        console.log("res:")
        console.log(res)
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })
}

/**
 * 绑定pc端网站的账号
 */
const bindWebAccount = () => {
// 跳转页面
  uni.navigateTo({
    url: '/pages/bindWebAccount/index'
  })


}

/**
 * 跳转页面,修改个人信息
 */
const changeUserInfo = () => {
  uni.navigateTo({
    url: '/pages/mine/changeUserInfo/index'
  })
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
        <div class="ice-column wflex">
          <div class="ice-text margin-t-b-s">
            <up-text text="吾名" bold></up-text>
            <up-text class="wflex" :lines="1" :text="data.username"></up-text>
          </div>
          <div class="ice-text margin-t-b-s">
            <up-text text="最终召唤" bold></up-text>
            {{ data.occupation }}
          </div>

          <div class="ice-text margin-t-b-s">
            <up-text text="自我介绍" bold></up-text>
            {{ data.word || '暂无' }}
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
      <div class="ice-column alignEnd margin-lr-10">
        <div class="ice-row margin-bottom-s">
          <u-button class="btnWidth" text="退出登陆" @click="logOut"></u-button>
        </div>
        <!-- <div class="ice-row margin-bottom-s">
                  <u-button class="btnWidth" text="成为admin" @click="beAdmin"></u-button>
                </div>
                <div class="ice-row margin-bottom-s">
                  <u-button class="btnWidth" text="绑定账户" @click="bindWebAccount"></u-button>
                </div>-->

        <div class="ice-row margin-bottom-s">
          <u-button class="btnWidth" text="修改信息" @click="changeUserInfo"></u-button>
        </div>

      </div>
    </view>
  </u-popup>


</template>

<style scoped lang="less">

</style>
