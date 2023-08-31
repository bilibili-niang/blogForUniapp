<template>
  <view class="card" @tap="clickItem(item.uuid)">
    <view class="normal" :class="[
      cardType
  ]">
      <view class="item">
        <view class="title">
          作业道路:
        </view>
        <view class="descriptions">
          {{ item.range }}
        </view>
      </view>

      <view class="item">
        <view class="title">
          驾驶员:
        </view>
        <view class="descriptions">
          {{ item.cleaners }}
        </view>
      </view>

      <view class="item">
        <view class="title">
          车牌号:
        </view>
        <view class="descriptions">
          {{ item.constituencies }}
        </view>
      </view>

      <view class="item">
        <view class="title">
          考核时间:
        </view>
        <view class="descriptions">
          {{ item.checkTime }}
        </view>
      </view>

      <view class="item" v-if="item.score">
        <view class="title">
          扣分:
        </view>
        <view class="descriptions">
          {{ item.score }}
        </view>
      </view>
      <view class="item" v-if="item.content">
        <view class="title">
          作业内容:
        </view>
        <view class="descriptions">
          {{ item.content }}
        </view>
      </view>
      <view class="item" v-if="item.standard">
        <view class="title">
          作业标准:
        </view>
        <view class="descriptions">
          {{ item.standard }}
        </view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  name: "normalCard",
  props: {
    cardType: {
      type: String,
      default: "normal"
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    clickItem (id) {
      this.$emit('triggerItem', id)
    }
  }
}
</script>

<style lang="less">
.card {
  margin-top: @margin-ls;
  .padding-lr-20();
  font-size: 25rpx;

  .normal {
    padding-top: 50rpx;
    padding-bottom: 50rpx;
    border: 1px solid @borderColor;
    display: flex;
    flex-direction: column;
    border-radius: @radio-m;

    .item {
      display: flex;
      flex-direction: row;
      margin-top: 10rpx;

      .title {
        width: 25%;
        display: flex;
        flex-direction: row-reverse;
      }

      .descriptions {
        padding-left: 30rpx;
      }
    }
  }
}

// cardType
.normal {
}

.qualified {
  background: rgb(128, 255, 0);
}

.noQualified {
  background: rgb(242, 138, 129);
}
</style>
