<template>
  <!--机械化作业-->
  <div class="manualClean">
    <navBar title="机械化作业任务"></navBar>
    <view class="selections">
      <view class="selectionOneRow">
        <text clsss="firstColumn">道路</text>
        <text class="center">驾驶员</text>
        <view></view>
      </view>

      <view class="selectionTwoRow">
        <uni-datetime-picker class="timePicker" type="date" :clear-icon="false" v-model="single"
                             @maskClick="maskClick"/>
        <uni-data-select
            class="selector"
            v-model="groupValue"
            :localdata="groupRange"
            @change="change"
        ></uni-data-select>
        <button class="operator button">确认</button>
      </view>
    </view>
    <view class="valDescriptions" v-if="!activeId">
      <view class="item">
        <view class="color"></view>
        <view class="text">
          待考核
        </view>
      </view>

      <view class="item">
        <view class="color green"></view>
        <view class="text">
          合格
        </view>
      </view>

      <view class="item">
        <view class="color red"></view>
        <view class="text">
          不合格
        </view>
      </view>
    </view>

    <view class="context" v-show="!activeId">
      <template v-for="(item,index) in itemList" :key="index">
        <normalCard :cardType="item.type" :item="item" @triggerItem="activeItem"></normalCard>
      </template>
    </view>


    <view class="actived" v-show="activeId">
      <normalCard cardType="normal" :item="activeData" v-if="activeData"></normalCard>
      <view class="formControl">
        <view class="form">
          <uni-table border stripe emptyText="暂无更多数据">
            <!-- 表头行 -->
            <uni-tr>
              <uni-th width="120">考核项</uni-th>
              <uni-th>评分</uni-th>
            </uni-tr>
            <!-- 表格数据行 -->
            <uni-tr>
              <uni-td>首扫及速度</uni-td>
              <uni-td>score</uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>卫生死角</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>着装</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>离岗(脱岗)</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>公测</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>巡回捡白</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>果皮箱</uni-td>
              <uni-td></uni-td>
            </uni-tr>
            <uni-tr>
              <uni-td>绿化及周边白色</uni-td>
              <uni-td></uni-td>
            </uni-tr>

          </uni-table>
        </view>
      </view>

      <view class="btns">
        <button class="button" @tap="activeId=''">取消</button>
        <button class="button" @tap="activeId=''">确定</button>
      </view>
    </view>

  </div>
</template>

<script>
import NormalCard from '@/components/machineClean/normalCard.vue'
import NavBar from '@/components/common/navBar.vue'

export default {
  name: "index",
  components: { NavBar, NormalCard },
  data () {
    return {
      // 日期
      single: '2023-08-15',
      groupValue: 0,
      groupRange: [
        { value: 0, text: "全部" },
        { value: 1, text: "待考核" },
        { value: 2, text: "考核完成" },
      ],
      itemList: [
        {
          range: '占林东路到秋实南路红绿灯',
          cleaners: '王某与李某',
          constituencies: '浙A83843452',
          checkTime: '',
          score: '',
          type: 'normal',
          uuid: '95756345'
        },
        {
          range: '秋实南路路口到郸县大到路口',
          cleaners: '王某与李某',
          constituencies: '浙A83843452',
          checkTime: '2023-08-25 17:23:21',
          score: '-2.5',
          type: 'noQualified',
          uuid: '53423'
        }, {
          range: '秋实南路路口到郸县大到路口',
          cleaners: '王某与李某',
          constituencies: '浙A83843452',
          checkTime: '2023-08-25 17:23:21',
          score: '0',
          type: 'qualified',
          uuid: '234'
        }
      ],
      activeId: ''
    }
  },
  methods: {
    change (e) {
      console.log("e:", e)
    },
    maskClick (e) {
      console.log('maskClick事件:', e)
    },
    activeItem (val) {
      this.activeId = val
    }
  },
  computed: {
    activeData () {
      if (this.activeId) {
        const item = this.itemList.filter(item => item.uuid === this.activeId)
        item[0].content = '收集xxxxxxxxxxxx'
        item[0].standard = '收集xxxxxxxxxxxx'
        return item[0]
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped lang="less">
.flex-row(@direction:row) {
  display: flex;
  flex-direction: @direction;
}

.manualClean {
  .flex-row(column);

  .selections {
    margin-top: 20rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    .flex-row(column);

    .selectionOneRow, .selectionTwoRow {
      font-size: 25rpx;
      width: 100%;
      .flex-row();
      flex-wrap: nowrap;
    }

    .selectionOneRow {
      height: 70rpx;

      text {
        margin-right: 20rpx;
        border: 1px solid rgba(0, 0, 0, .6);
        display: flex;
        width: 30vw;
        align-items: center;
        justify-content: center;
      }
    }

    .selectionTwoRow {
      justify-content: space-between;
      margin-top: 10rpx;

      .selector {
        margin-left: 10rpx;
        margin-right: 10rpx;
        width: 30vw;
      }

      .timePicker {
        display: flex;
        border: 1px solid rgba(0, 0, 0, .6);
        width: 30vw;
        align-items: center;
        justify-content: center;

        .uni-date-editor {
          width: 100%;
        }
      }

      .operator {
        width: 15vw;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

  }

  .valDescriptions {
    padding-left: 20rpx;
    padding-right: 20rpx;
    .flex-row();
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin-top: 20rpx;

    .item {
      .flex-row();
      margin-right: 30rpx;
      font-size: 25rpx;

      .color {
        .flex-row();
        border: 1px solid rgba(0, 0, 0, .4);
        width: 60rpx;
        margin-right: 10rpx;
      }
    }

    .green {
      background: rgb(128, 255, 0);
    }

    .red {
      background: rgb(242, 138, 129);
    }
  }

}


.button {
  font-size: 25rpx;
}

.actived {
  border: 1px solid rgba(0, 0, 0, .5);
  margin-top: 30rpx;
  padding-top: 0;
  width: 85%;
  margin-left: auto;
  margin-right: auto;

  .form {
    width: 90%;
    margin: 20rpx auto 0;
  }

  .btns {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
    margin-bottom: 20rpx;

    /deep/ .button {
      font-size: 25rpx;
      border-color: rgba(0, 0, 0, .8);
    }
  }
}
</style>
