<script lang="ts" setup>
import TabBar from '@/components/common/tabBar/index.vue'
import { globalStore } from '@/stores'

const global = globalStore()
</script>

<template>
  <div class="mainContainer">
    {{ global.$state.activePage }}

    <TabBar/>
  </div>
</template>

<style scoped lang="less">

</style>