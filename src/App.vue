<script setup lang="ts">
import {onLaunch} from "@dcloudio/uni-app";
import api from "@/utils/api";
import {useMemberStore} from "@/stores";

const memberStore = useMemberStore();

const loginByToken = async () => {
  console.log("onLaunch")
  try {
    // 从localStorage中获取token
    let tokenStr = ""
    uni.getStorage({
      key: 'token',
      success: function (res) {
        tokenStr = res.data + '';
      }
    });
    if (tokenStr) {
      // 假设这里有一个函数getUserInfoByToken用于通过token获取用户信息
      const data = await api.getUserInfoByToken(tokenStr);
      // 写入pinia
      memberStore.setProfile(data.result.res)
      uni.showTabBar()
    } else {
      // 隐藏
      uni.hideTabBar()
    }
  } catch (e) {
  }
}
onLaunch(() => {
  // 强制竖屏
  //#ifdef APP-PLUS
  plus.screen.lockOrientation("portrait-primary"); // 强制竖屏
  //#endif
  loginByToken();
});

</script>
<style lang="less">
#app{
  margin-bottom: 10vh;
}
</style>
