<script setup lang="ts">
import {onHide, onLaunch, onShow} from "@dcloudio/uni-app";

onLaunch(() => {
  // 强制竖屏
  //#ifdef APP-PLUS
  plus.screen.lockOrientation("portrait-primary"); // 强制竖屏
  //#endif
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
