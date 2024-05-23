<template>
  <customNavBar :back="false" :title="'事件'+flag"></customNavBar>
  <view class="addEvents">
    <view class="formLim" v-if="flag==='add'">
      <div class="ice-row alignC">
        <div class="ice-tag">今天是</div>
        <view class="ice-tag">
          {{ time }}
        </view>
      </div>

      <div class="ice-row alignC">
        <div class="ice-tag">天气</div>
        <view class="ice-tag">
          {{ weather.city }}-{{ weather.weather || '晴天 15°~30°' }}
        </view>
      </div>

      <view class="formItem">
        <div class="ice-tag">今日内容</div>
        <view class="time">
          <uni-easyinput v-model="events.name" :clearable="false"
                         placeholder="加个标题吧">
          </uni-easyinput>
        </view>
        <view class="time margin-top-m">
          <uni-easyinput type="textarea" v-model="events.content" :clearable="false"
                         placeholder="请输入内容"></uni-easyinput>
        </view>
      </view>
      <view class="formItem">
        <div class="ice-tag">description</div>

        <CustomButton @click="showFlag">{{ showDescription ? 'hide' : 'show' }}</CustomButton>

        <view class="time" v-show="showDescription">
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

        <CustomButton @click="showFlagshowTomorrow">{{ showTomorrow ? 'hide' : 'show' }}</CustomButton>

        <view class="time" v-show="showTomorrow">
          <uni-easyinput v-model="events.tomorrow" :clearable="false" placeholder="请输入内容"></uni-easyinput>
        </view>
      </div>

      <view class="btns">
        <CustomButton :disable="allowClick" @click="post">提交内容</CustomButton>
      </view>
    </view>

    <div class="readDataContainer margin-top-m ice-column" v-if="flag==='view'">
      <div class="row w-percent100">
        <up-text :text="data.name"></up-text>
        <CustomButton @click="changeMode">编辑</CustomButton>
      </div>
      <div class="row  margin-top-m">
        <up-tag text="description" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>
      <div class="row">
        <up-text :text="data.description"></up-text>
      </div>
      <div class="row margin-top-m">
        <up-tag text="content" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>
      <div class="row">
        <up-text :text="data.content"></up-text>
      </div>
      <div class="row margin-top-m">
        <up-tag text="tags" size="mini" plain :borderColor="activeColor" :color="activeColor"></up-tag>
      </div>
      <div class="row margin-top-s">
        <div class="margin-lr-10">
          <up-tag :text="data.tag1" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag1"></up-tag>
        </div>
        <div class="margin-lr-10">
          <up-tag :text="data.tag2" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag2"></up-tag>
        </div>
        <div class="margin-lr-10">
          <up-tag :text="data.tag3" plain :borderColor="activeColor" :color="activeColor" v-if="data.tag3"></up-tag>
        </div>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import api from '@/utils/api'
import './index.less'
import CustomButton from '@/components/common/customButton/index.vue'
import { activeColor } from '@/config'

const now = dayjs()
// 当前模式 view为浏览
const flag = ref('add')
const data = ref({})
const time = ref('')

const events = ref<any>({
  op: 'add',
  name: '',
  description: '',
  content: '',
  tag1: '',
  tag2: '',
  tag3: '',
  tomorrow: ''
})

const allowClick = ref(false)

const post = async () => {
  if (!events.value.name) {
    uni.showToast({
      title: '需要先填写内容',
      icon: 'none'
    })
    return void 0
  }
  allowClick.value = !allowClick.value
  const res = await api.postEvents({
    ...events.value,
    token: uni.getStorageSync('token') || ''
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
      icon: 'none'
    })
  }
  init()
}

const init = () => {
  const year = now.year()
  const month = now.month() + 1 // 月份是从 0 开始的，所以需要加 1
  const date = now.date()
  time.value = `${year}-${month}-${date}`
  // 获取今日事件
  getTodayEvents()
}

const getTodayEvents = async () => {
  // 获取当前日期的年、月、日
  const currentYear = dayjs().format('YYYY')
  const currentMonth = dayjs().format('MM')
  const currentDay = dayjs().format('DD')
  api.getToday({
    day: currentYear + '-' + currentMonth + '-' + currentDay
  })
      .then(res => {
        if (!res.success) {
          // 提示
          uni.showToast({
            title: '今天还没有填写',
            icon: 'none'
          })
        } else {
          data.value = res.result
          uni.showToast({
            title: '今天已填写',
            icon: 'none'
          })
          flag.value = 'view'
        }
      })
      .catch(e => {
        console.log('e:')
        console.log(e)
      })
}

// 获取今日天气
const weather = ref({})
const getWeather = async () => {
  const res = await api.getAddressByIp()
  weather.value = res

}

// 是否展示 description
const showDescription = ref(false)
const showFlag = () => {
  showDescription.value = !showDescription.value
}
const showTomorrow = ref(false)
const showFlagshowTomorrow = () => {
  showTomorrow.value = !showTomorrow.value
}
const changeMode = () => {
  events.value = data.value
  flag.value = 'add'
}

getWeather()
init()
</script>

