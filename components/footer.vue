<template>
  <div class="footer-wrapper">
    <div class="footer">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6" class="info">
          <h5>闲云旅游旅游网</h5>
          <p>上亿旅行者共同打造的"旅行神器"</p>
          <p>
            <span>60,000</span> 多个全球旅游目的地
          </p>
          <p>
            <span>600,000</span> 个细分目的地新玩法
          </p>
          <p>
            <span>760,000,000</span> 次攻略下载
          </p>
          <p>
            <span>38,000</span> 家旅游产品供应商
          </p>
        </el-col>
        <el-col :span="5" class="info">
          <h5>关于我们</h5>
          <p>隐私政策 商标声明</p>
          <p>服务协议 游记协议</p>
          <p>商城平台服务协议</p>
          <p>网络信息侵权通知指引</p>
          <p>闲云旅游旅游网服务监督员</p>
          <p>网站地图加入闲云旅游</p>
        </el-col>
        <el-col :span="5" class="info">
          <h5>旅行服务</h5>
          <p>旅游攻略 酒店预订</p>
          <p>旅游特价 国际租车</p>
          <p>旅游问答 旅游保险</p>
          <p>旅游指南 订火车票</p>
          <p>旅游资讯 APP下载</p>
        </el-col>
        <el-col :span="6" class="ewm">
          <p>
            <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          </p>关注我们
        </el-col>
      </el-row>
      <div class="xian"></div>
      <div
        class="compony"
      >京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</div>
    </div>
  </div>
</template>
 
<script>
</script>
 
<style lang='less' scoped>
.footer-wrapper {
  min-width: 1000px;
  height: 330px;
  background-color: #333333;
  .footer{
      width: 1000px;
      margin: 0px auto;
      padding-top: 20px
  }
  .info {
    color: #ccc;
    font-size: 13px;
    margin: 20px 40px;
    h5 {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      span {
        color: #ffa500;
      }
    }
  }
  .xian{
      border: 1px solid #ccc;
  }
  .ewm {
    color: #ccc;
    font-size: 13px;
    text-align: center;
    img {
      width: 140px;
      height: 140px;
    }
  }
  .compony {
    color: #ccc;
    font-size: 13px;
    margin:60px 0;
    text-align: center;
  }
}
</style>