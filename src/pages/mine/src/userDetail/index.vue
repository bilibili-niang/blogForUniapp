<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'userDetail'
})
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import api, { baseUrl } from '@/utils/api'
import { useMemberStore } from '@/stores/index'
import CustomButton from '@/components/common/customButton/index.vue'

const memberStore = useMemberStore()
const props = defineProps({
  data: {
    type: Object,
    default: { name: '张三', age: 18 }
  }
})

const imgUrl = computed(() => {
  return baseUrl + props.data.avatar
})
// 弹窗
const showPopup = ref(false)
const close = () => {
  showPopup.value = !showPopup.value
}
// 退出登录
const logOut = async () => {
  try {
    // 使用Promise.all确保所有清除操作完成后再进行下一步
    await Promise.all([
      uni.removeStorageSync('user'),
      uni.removeStorageSync('token'),
      uni.removeStorageSync('member')
    ])
    memberStore.clearProfile()
    // 显示成功提示
    uni.showToast({
      title: '退出登录成功',
      icon: 'none'
    })
    uni.reLaunch({
      url: '/pages/mainContainer/index'
    })
  } catch (e) {
    // 处理可能的异常情况
    console.error('退出登录时发生错误:', e)
    uni.showToast({
      title: '退出登录失败，请重试',
      icon: 'none'
    })
  }
}

// 成为admin!
const beAdmin = async () => {
  await api.becomeAdmin()
      .then(res => {
        console.log('res:')
        console.log(res)
      })
      .catch(e => {
        console.log('e:')
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
  })
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
          <CustomButton @click="showPopup = true">
            设置
          </CustomButton>
        </div>
      </div>
    </div>
  </div>

  <u-popup :show="showPopup" mode="top" safeAreaInsetTop :round="10" @close="close" @open="open">
    <view>
      <div class="ice-column alignEnd margin-lr-10">
        <div class="ice-row margin-bottom-s">
          <CustomButton @click="logOut">
            退出登录
          </CustomButton>
        </div>

        <div class="ice-row margin-bottom-s">
          <CustomButton @click="changeUserInfo">
            修改信息
          </CustomButton>
        </div>
      </div>
    </view>
  </u-popup>
</template>

<style scoped lang="less">

</style>
