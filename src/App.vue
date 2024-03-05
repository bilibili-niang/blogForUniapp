<script setup lang="ts">
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app";
import api from "@/utils/api";

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
      const userInfo = await api.getUserInfoByToken(tokenStr);
      console.log("userInfo:")
      console.log(userInfo);
    }

  } catch (e) {
    console.log(e)
  }
}

onLaunch(() => {
  // 强制竖屏
  //#ifdef APP-PLUS
  plus.screen.lockOrientation("portrait-primary"); // 强制竖屏
  //#endif
  loginByToken();
});
onShow(() => {

});
onHide(() => {

});
</script>
<style lang="less">
#app{
  margin-bottom: 10vh;
}
</style>
