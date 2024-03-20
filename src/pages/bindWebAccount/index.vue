<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "bindWebAccount"
});
</script>

<script setup>
import {borderColor} from "@/utils/tools";
import {ref} from "vue";

const model1 = ref({
  userInfo: {
    account: "",
    password: "",
    sex: "",
  },
});
/**
 * 提交
 */
const form1 = ref();
const submit = () => {
  form1.value.validate()
      .then(res => {
        console.log(res);
      })
      .catch(errors => {
        console.log(errors);
      });
};
const rules = ref({
  account: [
    {
      required: true,
      message: "请输入账户名",
      trigger: ["blur", "change"]
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: ["blur", "change"]
    }
  ]
});

</script>
<template>
  <div class="bindWebAccountPag padding-lr-10">
    <div class="ice-column">
      <up-text type="info" text="绑定账号"></up-text>
      <div class="ice-row">
        <u-tag text="注意" size="mini" :bgColor="borderColor" :borderColor="borderColor"></u-tag>
        <up-text type="info" text="该账户是blog.icestone.work中的账户"></up-text>
      </div>
      <up-text type="info" text="网站上的账户信息将覆盖当前账户的信息"></up-text>
    </div>
    <div class="ice-column">
      <u--form
          labelPosition="left"
          :model="model1"
          :rules="rules"
          ref="form1"
      >
        <u-form-item
            label="账户"
            prop="userInfo.account"
            borderBottom
            ref="item1"
        >
          <u--input
              v-model="model1.userInfo.account"
              border="none"
          ></u--input>
        </u-form-item>

        <u-form-item
            label="密码"
            prop="userInfo.account"
            borderBottom
            ref="item1"
        >
          <u--input
              v-model="model1.userInfo.password"
              border="none"
          ></u--input>
        </u-form-item>
      </u--form>
      <u-button @click="submit">提交</u-button>

    </div>

  </div>
</template>

<style scoped lang="less">

</style>