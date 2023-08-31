<template>
  <view class="content">
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
