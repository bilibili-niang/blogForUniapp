<template>
  <view class="content">
    <view class="title">
      环卫巡查端
    </view>
    <view class="formControl">
      <view class="forInputItem">
        <view class="formTitle">
          账号
        </view>
        <uni-easyinput class="uni-mt-5" trim="all" v-model="accountVal" placeholder="请输入账号"></uni-easyinput>
      </view>

      <view class="forInputItem">
        <view class="formTitle">
          密码
        </view>
        <uni-easyinput class="uni-mt-5" trim="all" v-model="passwordVal" placeholder="请输入密码"></uni-easyinput>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {useMemberStore} from "@/stores";
import {ref} from "vue";

const memberStore = useMemberStore()

let accountVal = ref('')
let passwordVal = ref('')


</script>

<style scoped lang="less">

</style>
