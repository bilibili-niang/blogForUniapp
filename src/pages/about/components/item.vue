<template>
  <view class="itemCon">
    <div class="ice-column" @click="goToRead(childrenItem.id)">
      <div class="ice-row margin-lr-10 margin-top-s">
        <up-text :text="childrenItem.title" bold size="16"></up-text>
      </div>
      <div class="ice-row margin-lr-10 ">
        <div class="ice-column w-70 alignS">
          <up-text :lines="3" :text="childrenItem.description||'-'" size="14" color="#5e616d"></up-text>
        </div>
        <div class="ice-column w-30 hAuto">
          <up-image :show-loading="true" radius="5px" :src="baseUrl+childrenItem.headImg"
                    width="100px"
                    height="100px"></up-image>
        </div>
      </div>
      <div class="ice-row margin-bottom-m justB margin-lr-10">
        <up-text :text="getTimeByStr(childrenItem.updatedAt)||'-'" size="12"></up-text>

        <div class="ice-row margin-top-s">
          <div class="ice-row margin-lr-10">
            <u-icon name="thumb-up"></u-icon>
            <up-text :text="childrenItem.praise || 0 " size="14" color="#5e616d"></up-text>
          </div>
          <div class="ice-row margin-lr-10">
            <u-icon name="eye"></u-icon>
            <up-text :text="childrenItem.view || 0" size="14" color="#5e616d"></up-text>
          </div>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {baseUrl} from "@/utils/api";

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const childrenItem = ref()

// 跳转阅读
const goToRead = (id: number) => {
  uni.setStorageSync('readId', id)
  uni.navigateTo({
    url: '/pages/read/index?id=' + id
  })
}

childrenItem.value = props.item
// childrenItem.value.headImg = api.mainUrl + props.item?.headImg

// 截取时间
const getTimeByStr = (str: string): string => {
  return str.slice(0, 10) + " " + str.slice(11, 16);
};

</script>

<style scoped lang="less">
.itemCon{
  overflow: hidden;
  margin-bottom: @margin-m;
  border-radius: @radio-ls;
  background-size: cover;
  background: @borderColor;
}
</style>
