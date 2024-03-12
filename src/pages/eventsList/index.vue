<template>
  <div class="eventsList">
    <div v-for="(item, index) in dataList" :key="index">
      <div class="ice-column eventItem margin-top-l">
        <u-divider :text="item.name" textPosition="left"></u-divider>
        <div class="ice-column">
          <div class="ice-row">
            <u-text text="description"></u-text>
          </div>
          <up-text :text="getTimeByStr(item.description)"></up-text>
          <div class="blockLine"></div>
          <div class="ice-row">
            <u-text text="content"></u-text>
          </div>
          <up-text :text="getTimeByStr(item.content)"></up-text>
        </div>
        <div class="ice-row margin-top-s justB">
          <up-text :text="getTimeByStr(item.createdAt)"></up-text>
          <div class="ice-row">
            <u-tag :text="item.tag1" size="mini" :bgColor="borderColor" :borderColor="borderColor"
                   v-if="item.tag1!==''"></u-tag>
            <div class="blockVertical">2</div>
            <u-tag :text="item.tag2" size="mini" :bgColor="borderColor" :borderColor="borderColor"
                   v-if="item.tag2!==''"></u-tag>
            <div class="blockVertical">3</div>
            <u-tag :text="item.tag3" size="mini" :bgColor="borderColor" :borderColor="borderColor"
                   v-if="item.tag3.length>0"></u-tag>
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
  background: @borderColor;

  .eventItem{
    .margin-top-l();
    .margin-lr-10();
    padding: @padding-m;
    background: white;
    border-radius: @radio-m;
    margin-bottom: @margin-m;
  }
}

</style>