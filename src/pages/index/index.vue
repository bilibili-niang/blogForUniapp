<template>
  <div class="indexPage">


  </div>

</template>

<script setup lang="ts">
import {reactive} from 'vue';

const viewData = reactive([])
// 节假日列表
const festivals = reactive([
  {id: '0', name: '下班', type: '3', date: ''},
  {id: '1', name: '下一个周末', type: '2', date: ''},
  {id: '2', name: '清明节', type: '1', date: '2024.4.4'},
  {id: '3', name: '劳动节', type: '1', date: '2024.5.5'},
  {id: '4', name: '端午节', type: '1', date: '2024.6.10'},
  {id: '5', name: '中秋节', type: '1', date: '2024.9.16'},
  {id: '6', name: '国庆节', type: '1', date: '2024.10.1'},
  {id: '7', name: '元旦节', type: '1', date: '2025.1.1'},
  {id: '8', name: '除夕', type: '1', date: '2025.1.28'},
  {id: '9', name: '春节', type: '1', date: '2025.1.29'},
])


</script>

<style scoped lang="less">
.indexPage{
}
.list{
  display: grid;
  grid-template-columns: 160px 160px;
}
.item-left{
  width: 180px;
}
.item-date-time{
  display: flex;
  justify-content: flex-end;
}
</style>
