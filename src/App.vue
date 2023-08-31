<script setup lang="ts">
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app";
import {useRoute} from "vue-router"

onLaunch(() => {
  // h5
  const route = useRoute()
  const {path} = route
  if (path !== '/pages/login/index' && !uni.getStorageSync("TOKEN")) {
    uni.navigateTo({
      url: '/pages/login/index'
    })
  } else {
    if (uni.getStorageSync("TOKEN")) {
      uni.navigateTo({
        url: '/pages/index/index'
      })
    }
  }
  switch (uni.getSystemInfoSync().platform) {
    case 'android':
      // console.log('运行Android上')
      break;
    case 'ios':
      // console.log('运行iOS上')
      break;
    default:
      // console.log('运行在开发者工具上')
      break;
  }

});
onShow(() => {

});
onHide(() => {

});
</script>
<style lang="less">
@import "@/static/css/common.less";
@import "@/static/css/variable.less";

#app, .popupLim {
  max-width: 500px;
  margin: 0 auto;
}
</style>
