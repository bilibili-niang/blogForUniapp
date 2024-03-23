<script lang="ts" setup>
import {useMemberStore} from '@/stores/index'
import {computed, ref} from 'vue';
import {deepClone, getTimeByStr} from "@/utils/tools";
import api, {baseUrl} from "@/utils/api";

const store = useMemberStore();


let model1 = ref({
  profile: {}
})
let profile = ref({})


const init = () => {
  model1.profile = deepClone(store.$state.profile);
  profile.value = deepClone(store.$state.profile);
}
init();
const avatarClick = () => {
  console.log("avatarClick")
}
const imgUrl = computed(() => {
  return baseUrl + profile.value.avatar
})

/**
 * 编辑/查看的状态
 */
let editMode = ref(false);

const rules = ref({
  'username': {
    type: 'string',
    required: true,
    message: '请填写名字',
    trigger: ['blur', 'change']
  }
})

/**
 * 保存提交
 */
let userInfoForm = ref(null);
// 用户编辑之前保存一份,在点击取消编辑后恢复此数据
let userOldInfo = ref({});
const submitUserInfo = () => {
  userOldInfo.value = deepClone(profile.value);
  console.log("userOldInfo.value:")
  console.log(userOldInfo.value)
  userInfoForm.value.validate().then(async res => {
    console.log('res')
    console.log(res)
    await api.updateUserInfo({
      ...profile.value
    })
        .then(res => {
          console.log("res:")
          console.log(res)
          if (res.success) {
            uni.showToast({
              title: res.message,
              icon: 'success'
            })
          } else {
            uni.showToast({
              title: '保存失败',
              icon: 'error'
            })
          }
        })
        .catch(e => {
          console.log("e:")
          console.log(e)
        })

  }).catch(err => {
    uni.showToast({
      title: '请填写必填信息',
      icon: 'error'
    })
  })
}

/**
 * 用户点击编辑
 */
const edit = () => {
  userOldInfo.value = deepClone(profile.value);
  editMode.value = true;
}

/**
 * 点击取消编辑,恢复编辑前的数据
 */
const cancelEdit = () => {
  profile.value = deepClone(userOldInfo.value);
  editMode.value = false;
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

        <u--form
            labelPosition="left"
            :model="profile"
            :rules="rules"
            ref="userInfoForm"
        >

          <u-form-item
              label="吾名"
              prop="username"
              borderBottom
              required
              ref="item1">
            <u--input
                v-model="profile.username"
                border="none"
            ></u--input>
          </u-form-item>

          <u-form-item
              label="自我介绍"
              prop="word"
              borderBottom
              ref="item1">
            <u--input
                v-model="profile.word"
                border="none"
            ></u--input>
          </u-form-item>

          <u-form-item
              label="职业"
              prop="occupation"
              borderBottom
              ref="item1">
            <u--input
                v-model="profile.occupation"
                border="none"
            ></u--input>
          </u-form-item>

          <u-form-item
              label="github"
              prop="githubUrl"
              borderBottom
              width="130rpx"
              ref="item1">
            <u--input
                v-model="profile.githubUrl"
                border="none"
            ></u--input>
          </u-form-item>
        </u--form>

        <div class="ice-row margin-t-b-s">
          <u-button text="保存" @click="submitUserInfo"></u-button>
          <u-button text="取消编辑" @click="cancelEdit"></u-button>
        </div>

      </div>


      <div class="ice-row margin-t-b-s" v-if="!editMode">
        <u-button :text="editMode?'保存':'编辑'" @click="edit"></u-button>
      </div>

    </div>


  </div>
</template>

<style scoped lang="less">
.changeUserInfo{
  .userCard{
    background: @bacColor-bleak-bleak;
    border-radius: @radio-m;
  }
}

</style>
