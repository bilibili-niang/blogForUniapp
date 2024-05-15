<template>
  <view class="itemCon">
    <div :class="['ice-column','itemContaier',!childrenItem.name&&'errorItem']" @click="alertOption">
      <div class="ice-row margin-lr-10 margin-top-s">
        <up-text :lines="1" :text="childrenItem.name" size="16"></up-text>
      </div>
      <div class="ice-column margin-lr-10 ">
        <div class="ice-column w-100 alignS">
          <up-text :lines="3" :text="childrenItem.description||'-'" size="14" color="#5e616d"></up-text>
        </div>
        <div class="ice-column w-100 hAuto">
          <div class="ice-row">
            <up-text :text="childrenItem.content||'-'" size="12"></up-text>
          </div>
        </div>
      </div>
      <div class="ice-row margin-bottom-m justB margin-lr-10 margin-top-s">
        <div class="ice-column">
          <up-text :text="getTimeByStr(childrenItem.updatedAt)||'-'" size="12"></up-text>
        </div>
        <div class="ice-row">
          <up-tag :text="childrenItem.tag1" size="mini" plain :borderColor="activeColor" :color="activeColor"
                  v-if="childrenItem.tag1"></up-tag>
          <div class="blockVertical" v-if="childrenItem.tag1"></div>
          <up-tag :text="childrenItem.tag2" size="mini" plain :borderColor="activeColor" :color="activeColor"
                  v-if="childrenItem.tag2"></up-tag>
          <div class="blockVertical" v-if="childrenItem.tag2"></div>
          <up-tag :text="childrenItem.tag3" size="mini" plain :borderColor="activeColor" :color="activeColor"
                  v-if="childrenItem.tag3"></up-tag>
        </div>
      </div>
    </div>
  </view>

  <uni-popup ref="popupRef" mask-click>
    <div class="popupContainer">
      <text>Popup</text>
      确定删除吗？
      <div class="row">
        <CustomButton @click="close">确定</CustomButton>
        <CustomButton @click="close">关闭</CustomButton>
      </div>
    </div>

  </uni-popup>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTimeByStr } from '@/utils/tools'
import CustomButton from '@/components/common/customButton/index.vue'
import { activeColor } from '@/config'

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const childrenItem = ref()

//
const alertOption = () => {
  if (childrenItem.value.name) {
    goToRead(childrenItem.value.id)
  } else {
    alertDelete()
  }
}

// 跳转阅读
const goToRead = (id: number) => {
  uni.setStorageSync('readId', id)
  uni.navigateTo({
    url: '/pages/read/index?id=' + id
  })
}

const popupRef = ref()

// 弹出是否删除
const alertDelete = () => {
  popupRef.value?.open('bottom')
}

// 关闭弹窗
const close = () => {
  popupRef.value?.close()
}

function init() {
  childrenItem.value = props.item
}

init()
</script>

<style scoped lang="less">
.itemCon {
  border-radius: @radio-ls;
  margin-bottom: @margin-l;
  background: white;
  box-shadow: 0 6px 12px @themeActiveColor;
  overflow: hidden;

  .itemContaier {
    border-radius: @radio-ls;
  }

  .errorItem {
    opacity: .5;
    background: rgba(0, 0, 0, .1);
  }
}

.popupContainer {
  padding: @padding-m;
  background: @bacColor;
  min-height: 50vh;
  height: 100%;
  border-radius: @radio-m;
  margin-bottom: @margin-m;
}
</style>
