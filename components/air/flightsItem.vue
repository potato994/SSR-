<template>
  <div class="flight-item">
    <div @click="isShow = !isShow">
      <!-- 显示的机票信息 -->
      <el-row class="flight-info" align="middle" type="flex">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{this.ranTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price/2}}</span>起
        </el-col>
      </el-row>
    </div>

    <div class="flight-recommend" v-if="isShow">
      <!-- 要隐藏的座位信息 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            v-for="(item,index) in data.seat_infos"
            :key="index"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleToOrder(data.id,item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  //  对象的方式声明组件可以接收的属性
  props: {
    data: {
      type: Object, //声明属性的类型
      default: {} //属性的默认值
    }
  },
  computed: {
    ranTime() {
      const start = this.data.dep_time.split(":");
      const end = this.data.arr_time.split(":");

      // 间隔分钟
      let arr = end[0] * 60 + +end[1]; //出发时间
      let dep = start[0] * 60 + +start[1];

      if (arr < dep) {
        arr += 24 * 60;
      }
      const dis = arr - dep;
      const hours = Math.floor(dis / 60);
      const min = dis % 60;
      return `${hours}时${min}分`
    }
  },
  methods: {
    handleToOrder(id,seat_xid){
      this.$router.push({
        path:"/air/order",
        query:{
          id,
          seat_xid
        }
      })
    }
  }
};
</script>
 
<style lang="less" scoped>
.flight-item {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.flight-info {
  padding: 15px;
  cursor: pointer;

  > div {
    &:first-child,
    &:last-child {
      text-align: center;
    }
  }
}

.flight-info-center {
  padding: 0 30px;
  text-align: center;

  .flight-airport {
    strong {
      display: block;
      font-size: 24px;
      font-weight: normal;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }

  .flight-time {
    span {
      display: inline-block;
      padding: 10px 0;
      border-bottom: 1px #eee solid;
      color: #999;
    }
  }
}

.flight-info-right {
  .sell-price {
    font-size: 24px;
    color: orange;
    margin: 0 2px;
  }
}
.flight-recommend {
  background-color: #f6f6f6;
  border: 1px solid #eee;
  padding: 0px 20px;
  .flight-sell {
    border-bottom: 1px solid #eee;
    padding: 10px;
    &:last-child {
      border-bottom: none;
    }
    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }
    .price {
      color: orange;
      font-size: 22px;
    }
    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>