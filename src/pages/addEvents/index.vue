<template>
  <customNavBar :back="false" :title="'事件'+flag"></customNavBar>
  <view class="addEvents">
    <view class="formLim" v-if="flag==='add'">
      <view class="formItem">
        <div class="ice-row alignC">
          <div class="ice-tag">time</div>
          <view class="ice-tag">
            {{ time }}
          </view>
        </div>
      </view>

      <view class="formItem">
        <div class="ice-tag">今日内容</div>
        <view class="time">
          <uni-easyinput type="textarea" v-model="events.content" :clearable="false"
                         placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>
      <!--<view class="formItem">
              <view class="title header">
                name
              </view>
              <view class="time">
                <uni-easyinput v-model="events.name" :clearable="false" placeholder="请输入内容"></uni-easyinput>
              </view>
            </view>-->
      <view class="formItem">
        <div class="ice-tag">description</div>
        <view class="time">
          <uni-easyinput type="textarea" :clearable="false" v-model="events.description"
                         placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>

      <view class="formItem ice-row">
        <div class="ice-column">
          <div class="ice-tag">tag1</div>
          <view class="time">
            <uni-easyinput v-model="events.tag1" :clearable="false" placeholder="请输入内容"></uni-easyinput>
          </view>
        </div>
        <div class="blockVertical"></div>
        <div class="ice-column">
          <div class="ice-tag">tag2</div>
          <view class="time">
            <uni-easyinput v-model="events.tag2" :clearable="false" placeholder="请输入内容"></uni-easyinput>
          </view>
        </div>
        <div class="blockVertical"></div>
        <div class="ice-column">
          <div class="ice-tag">tag3</div>
          <view class="time">
            <uni-easyinput v-model="events.tag3" :clearable="false" placeholder="请输入内容"></uni-easyinput>
          </view>
        </div>
      </view>

      <div class="ice-column">
        <div class="ice-tag">tomorrow</div>
        <view class="time">
          <uni-easyinput v-model="events.tomorrow" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </div>

      <view class="btns">
        <up-button text="提交" @click="post" :disable="allowClick"></up-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import dayjs from "dayjs";
import api from "@/utils/api";
import CustomNavBar from "@/pages/index/components/customNavBar.vue";

const now = dayjs();
// 当前模式 view为浏览
let flag = ref('add')

const time = ref('')
const content = ref('')

const events = reactive({
  op: "add",
  name: "",
  description: "",
  content: "",
  tag1: "",
  tag2: "",
  tag3: "",
  tomorrow: ""
})

const allowClick = ref(false);

const post = async () => {
  allowClick.value = !allowClick.value;
  console.log('post!')
  const res = await api.postEvents({
    ...events,
    token: uni.getStorageSync('token') || ""
  })
  if (res.success) {
    // 弹窗,创建成功
    uni.showToast({
      title: '创建成功',
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '创建失败',
      icon: 'error'
    })
  }
}


const init = () => {
  const year = now.year();
  const month = now.month() + 1; // 月份是从 0 开始的，所以需要加 1
  const date = now.date();
  time.value = `${year}-${month}-${date}`
}

init()
</script>

<style scoped lang="less">
.addEvents{
  .padding-lr-20();
  padding-bottom: 20vh;

}
</style>
