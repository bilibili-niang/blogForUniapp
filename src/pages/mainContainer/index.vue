<script lang="ts" setup>
import TabBar from '@/components/common/tabBar/index.vue'
import { globalStore } from '@/stores'
import Index from '../index/index.vue'
import AddEvents from '../addEvents/index.vue'
import List from '../list/index.vue'
import Mine from '../mine/index.vue'

const global = globalStore()
</script>

<template>
  <div class="mainContainer">
    <Index v-if="global.$state.activePage==='1'"></Index>
    <AddEvents v-if="global.$state.activePage==='2'"></AddEvents>
    <List v-if="global.$state.activePage==='3'"></List>
    <Mine v-show="global.$state.activePage==='4'"></Mine>

    <TabBar/>
  </div>
</template>

<style scoped lang="less">

</style>