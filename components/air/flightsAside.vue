<template>
  <div class="aside">
    <div class="statement">
      <el-row type="flex" justify="space-between" class="statement-list">
        <el-col :span="8">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>航协认证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont iconbaozheng" style="color:green;"></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>
          <span>7*24</span>
        </el-col>
      </el-row>
      <p class="service-tel">免费客服电话：4006345678转2</p>
    </div>
    <div class="history">
      <h5>历史查询</h5>
      <nuxt-link
        :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
        v-for="(item, index) in airsLog"
        :key="index"
      >
        <el-row type="flex" justify="space-between" align="middle" class="history-item">
          <div class="air-info">
            <div class="to-from">{{item.departCity}} - {{item.destCity}}</div>
            <p>{{item.departDate}}</p>
          </div>
          <span>选择</span>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      airsLog: []
    };
  },
  mounted() {
    this.airsLog = JSON.parse(localStorage.getItem("airs") || `[]`);
  }
};
</script>
 
<style lang="less" scoped>
.aside {
  width: 240px;
  margin-top: 18px;
  .statement {
    border: 1px #ddd solid;

    .statement-list {
      padding: 10px 0;
      > div {
        text-align: center;
        i {
          display: block;
          font-size: 40px;
        }
        span {
          font-size: 12px;
        }
      }
    }
    .service-tel {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      background: #f6f6f6;
      font-size: 14px;
    }
  }
  .history {
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 10px 8px;
    h5 {
      font-size: 16px;
      padding: 10px 0;
      font-weight: normal;
      border-bottom: 1px solid #ddd;
    }
    .history-item {
      padding: 8px 0;
      font-size: 12px;
      .to-from {
        font-size: 14px;
        padding: 6px;
      }
      p {
        text-align: center;
        color: #666;
      }
      span {
        display: inline-block;
        width: 50px;
        height: 20px;
        color: #fff;
        background-color: orange;
        border-radius: 5px;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>