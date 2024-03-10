<template>
  <div class="eventsList">
    <div v-for="(item, index) in dataList" :key="index">
      <div class="ice-column eventItem margin-top-l">
        <u-divider :text="item.name" textPosition="left"></u-divider>
        <div class="ice-column">
          <u-tag text="description" plain size="mini" :bgColor="borderColor" :borderColor="borderColor"></u-tag>
          <up-text :text="getTimeByStr(item.description)"></up-text>
          <div class="blockLine"></div>
          <u-tag text="content" plain size="mini" :bgColor="borderColor" :borderColor="borderColor"></u-tag>
          <up-text :text="getTimeByStr(item.content)"></up-text>
        </div>
        <div class="ice-row margin-top-s justB">
          <up-text :text="getTimeByStr(item.createdAt)"></up-text>
          <div class="ice-row ">
            <u-tag :text="item.tag1" plain size="mini" :bgColor="borderColor" :borderColor="borderColor" v-if="item.tag1"></u-tag>
            <div class="blockVertical"></div>
            <u-tag :text="item.tag2" plain size="mini" :bgColor="borderColor" :borderColor="borderColor" v-if="item.tag2"></u-tag>
            <div class="blockVertical"></div>
            <u-tag :text="item.tag3" plain size="mini" :bgColor="borderColor" :borderColor="borderColor" v-if="item.tag3"></u-tag>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import api from "@/utils/api/index";
import {borderColor, getTimeByStr} from "@/utils/tools";

const dataList = ref([]);

/**
 * 初始化获取list数据
 */
const init = async () => {
  // 加载弹窗
  uni.showToast({
    icon: 'loading',
    title: 'loading...'
  })
  await api.getEvents({
    token: uni.getStorageSync('token') || ""
  })
      .then(res => {
        dataList.value = res.result.rows
      })
      .catch(e => {
        console.log("e:")
        console.log(e)
      })

}
init();

</script>

<style scoped lang="less">
.eventsList{
  width: 100%;

  .eventItem{
    .margin-top-m();
    .margin-lr-10();
  }
}

</style>