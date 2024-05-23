<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "musicCard"
});
</script>

<script setup>
import {computed} from "vue";
import {baseUrl} from "@/utils/api";

const props = defineProps({
  item: {}
});

const imgUrl = computed(() => {
  return baseUrl + "/" + props.item.coverImg;
});
const audioAction = {
  method: "pause"
};
</script>

<template>
  <audio style="text-align: left" :src="baseUrl+item.url" :poster="imgUrl" :name="item.title"
         :author="item.author" :action="audioAction" controls></audio>
</template>

<style scoped lang="less">
</style>