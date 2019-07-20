<template>
  <div class="container">
    <!-- 国内机票标题 -->
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 单程往返和图片 -->
    <el-row type="flex" justify="space-between">
      <el-col>
        <searchForm />
      </el-col>
      <!-- banner图片 -->
      <el-col>
        <div class="banner">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </div>
      </el-col>
    </el-row>

    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409eff"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409eff"></i>
        <span>7*24小时服务</span>
      </el-col>
    </el-row>

    <!-- 特价机票标题 -->
    <h2 class="air-title-tj">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <div class="air-sale">
      <el-row class="air-sale-pic" type="flex" justify="space-between">
        <el-col :span="6" v-for="(item,index) in sales" :key="index" class="elcol">
          <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
            <img :src="item.cover" />
            <el-row type="flex" justify="space-between" class="layer-bar">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>￥{{Number(item.price).toFixed(2)}}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/air/searchForm";
export default {
  components: {
    searchForm
  },
  data() {
    return {
      sales:[]
    };
  },
  mounted() {
    this.$axios({
      url: "/airs/sale",
      method: "GET"
    }).then(res => {
      console.log(res);
      const {data} = res.data
      this.sales = data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title,
  .air-title-tj {
    color: orange;
    font-size: 21px;
    font-weight: 500;
    margin: 20px 0px;
  }
  .air-title-tj {
    color: #409eff;
  }
  .banner {
    margin-left: 20px;
  }
  .statement {
    height: 60px;
    width: 100%;
    border: 1px solid #ccc;
    margin: 15px 0px;
    background-color: #f5f5f5;
    padding: 10px 0;
    box-sizing: border-box;
    > div {
      text-align: center;
      border-right: 1px solid #ccc;
      line-height: 40px;

      &:last-child {
        border-right: none;
      }
    }
    i {
      font-size: 30px;
      vertical-align: middle;
    }
  }
  .air-sale {
    height: 180px;
    border: 1px solid #ddd;
    margin-bottom: 50px;
    .air-sale-pic {
      .elcol {
      position: relative;
        width: 220px;
        height: 140px;
        border: 1px solid #ddd;
        flex: 1;
        overflow: hidden;
        margin: 20px 10px 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .layer-bar{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: rgba(0, 0, 0, .6);
        color: #fff;
        padding: 0px 10px;
        font-size: 14px;
      }
    }
  }
}
</style>


