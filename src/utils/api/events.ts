import { http } from './index'

export default {
  // event提交
  async postEvents(params: {}) {
    return http<String[]>({
      url: '/api/events/addTodayEvent',
      data: params,
      method: 'POST'
    })
  },
  // 获取事件列表
  async getEvents(params: {}) {
    return http<String[]>({
      url: '/api/events/getTodayEvent',
      data: params,
      method: 'POST'
    })
  },
  async getAddressByIp() {
    return http<String[]>({
      url: 'https://restapi.amap.com/v3/ip?key=e3fbe77aa48a4ea73223d01f83c83a1b',
      method: 'GET'
    })
  },
  // 获取今日的事件
  async getToday(data: object) {
    return http<String[]>({
      url: '/api/events/getDayEvent',
      method: 'POST',
      data
    })
  }


}
