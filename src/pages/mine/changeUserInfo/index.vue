<script lang="ts" setup>
import {useMemberStore} from '@/stores/index'
import {computed, ref} from 'vue';
import {deepClone, getTimeByStr} from "@/utils/tools";
import {baseUrl} from "@/utils/api";


const store = useMemberStore();

console.log("store:")
console.log(store.$state)
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
  return baseUrl + profile.avatar
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
const submitUserInfo = () => {
  console.log(userInfoForm.value)
  userInfoForm.value.validate().then(res => {
    console.log('res')
    console.log(res)
  }).catch(err => {
    uni.showToast({
      title: '请填写必填信息',
      icon: 'error'
    })
  })
}
</script>

<template>
  <div class="changeUserInfo ">
    <div class="ice-row justC margin-top-l">
      <up-image :show-loading="true" :src="imgUrl" width="80px" height="80px"
                @click="avatarClick" shape="circle"></up-image>
    </div>

    <div class="ice-column padding-lr-20" v-if="!editMode">
      <div class="ice-row justB margin-t-b-s">
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

    <div class="ice-column padding-lr-20" v-if="editMode">

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
            ref="item1">
          <u--input
              v-model="profile.githubUrl"
              border="none"
          ></u--input>
        </u-form-item>
      </u--form>

      <div class="ice-row margin-t-b-s">
        <u-button text="保存" @click="submitUserInfo"></u-button>
      </div>

    </div>


    <div class="ice-row margin-t-b-s">
      <u-button :text="editMode?'保存':'编辑'" @click="editMode=!editMode"></u-button>
      <u-button text="取消编辑"></u-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.changeUserInfo{

}

</style>