<script lang="ts" setup>
import { useMemberStore } from '@/stores/index'
import { computed, ref } from 'vue'
import { deepClone, getTimeByStr } from '@/utils/tools'
import api, { baseUrl } from '@/utils/api'
import CustomButton from '@/components/common/customButton/index.vue'

const store = useMemberStore()

let model1 = ref({
  profile: {}
})
let profile = ref({})

const init = () => {
  model1.profile = deepClone(store.$state.profile)
  profile.value = deepClone(store.$state.profile)
}
init()
const avatarClick = () => {
  console.log('avatarClick')
}
const imgUrl = computed(() => {
  return baseUrl + profile.value.avatar
})

/**
 * 编辑/查看的状态
 */
let editMode = ref<boolean>(false)

/**
 * 保存提交
 */
// 用户编辑之前保存一份,在点击取消编辑后恢复此数据
let userOldInfo = ref({})
const submitUserInfo = async () => {
  userOldInfo.value = deepClone(profile.value)

  await api.updateUserInfo({
    ...profile.value
  })
      .then(res => {
        console.log('res 类型:')
        console.log(res)

        if (res.success) {
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
          editMode.value = !editMode.value
        } else {
          uni.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      })
      .catch(e => {
        uni.showToast({
          title: e || '修改出错了',
          icon: 'none'
        })
      })
}

/**
 * 用户点击编辑
 */
const edit = () => {
  userOldInfo.value = deepClone(profile.value)
  editMode.value = true
}

/**
 * 点击取消编辑,恢复编辑前的数据
 */
const cancelEdit = () => {
  profile.value = deepClone(userOldInfo.value)
  editMode.value = false
}

</script>

<template>
  <div class="changeUserInfo">

    <div class="userCard padding-lr-20 margin-lr-10 margin-top-m margin-bottom-s">

      <div class="ice-row justC margin-top-l">
        <up-image :show-loading="true" :src="imgUrl" width="80px" height="80px"
                  @click="avatarClick" shape="circle"></up-image>
      </div>

      <div class="ice-column" v-if="!editMode">
        <div class="ice-row justB margin-t-b-s w100">
          <up-text text="吾名" bold></up-text>
          {{ profile.username }}
        </div>

        <div class="ice-row justB margin-t-b-s">
          <up-text text="降临之日" bold></up-text>
          {{ getTimeByStr(profile.createdAt) }}
        </div>

        <div class="ice-row justB margin-t-b-s">
          <up-text text="自我介绍" bold></up-text>
          {{ profile.word || '暂无' }}
        </div>

        <div class="ice-row justB margin-t-b-s">
          <up-text text="最终召唤" bold></up-text>
          {{ profile.occupation || '暂无' }}
        </div>

        <div class="ice-row justB margin-t-b-s">
          <up-text text="github" bold></up-text>
          {{ profile.githubUrl || '暂无' }}
        </div>
      </div>

      <div class="ice-column" v-if="editMode">

        <div class="ice-row">
          <iceText width="130rpx">
            吾名
          </iceText>
          <up-input
              placeholder="吾名"
              border="bottom"
              clearable
              v-model="profile.username"
          />
        </div>

        <div class="ice-row">
          <iceText width="130rpx">
            自我介绍
          </iceText>
          <up-input
              placeholder="自我介绍"
              border="bottom"
              clearable
              v-model="profile.word"
          />
        </div>

        <div class="ice-row">
          <iceText width="130rpx">
            职业
          </iceText>
          <up-input
              placeholder="职业"
              border="bottom"
              clearable
              v-model="profile.occupation"
          />
        </div>

        <div class="ice-row">
          <iceText width="130rpx">
            github
          </iceText>
          <up-input
              placeholder="github"
              border="bottom"
              clearable
              v-model="profile.githubUrl"
          />
        </div>

        <div class="ice-row margin-t-b-s">
          <CustomButton @click="submitUserInfo">
            保存
          </CustomButton>
          <CustomButton @click="cancelEdit">
            取消编辑
          </CustomButton>
        </div>

      </div>

      <div class="ice-row margin-t-b-s" v-if="!editMode">
        <CustomButton @click="edit">
          {{ editMode ? '保存' : '编辑' }}
        </CustomButton>
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.changeUserInfo {
  .userCard {
    border-radius: @radio-m;
  }
}

</style>
