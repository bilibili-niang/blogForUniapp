<template>
  <view class="card" :class="[
      cardType
  ]" @tap="clickItem(item.uuid)">
    <view class="normal">
      <view class="item">
        <view class="title">
          范围:
        </view>
        <view class="descriptions">
          {{ item.range }}
        </view>
      </view>

      <view class="item">
        <view class="title">
          保洁员:
        </view>
        <view class="descriptions">
          {{ item.cleaners }}
        </view>
      </view>

      <view class="item">
        <view class="title">
          组别:
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
  margin-top: 40rpx;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  padding-top: 50rpx;
  padding-bottom: 50rpx;
  font-size: 25rpx;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 10rpx;

  .normal {
    display: flex;
    flex-direction: column;

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
