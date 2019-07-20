<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilter :data="cacheFlightsData" @changeDataList="changeDataList" />

        <!-- 航班头部布局 -->
        <flightsHead />

        <!-- 航班信息 -->
        <flightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <!-- 分页布局 -->
        <!-- size-change:切换条数是触发
            current-change：切换页码时触发
            page-sizes：默认一页多少条数据
        -->
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 侧边栏组件 -->
      <div class="aside">
        <flightsAside />
      </div>
    </el-row>
  </section>
</template>
 
<script>
import flightsHead from "@/components/air/flightslistHead";
import flightsItem from "@/components/air/flightsItem";
import flightsAside from "@/components/air/flightsAside";
import flightsFilter from "@/components/air/flightsFilters";
export default {
  components: {
    flightsHead,
    flightsItem,
    flightsAside,
    flightsFilter
  },
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      pageIndex: 1,
      total: 0,
      pageSize: 5,
      cacheFlightsData:{
        flights:[],
        info:{},
        options:{}
      }
    };
  },
  computed: {
    dataList() {
      return this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
    }
  },
  beforeRouteUpdate(to,from,next){
    next()
    this.getData()
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data}
        this.total = this.flightsData.flights.length;
      });
    },
    //   条数切换
    handleSizeChange(value) {
      this.pageSize = value;
    },
    // 页数切换
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    // 传递给子组件，用来修改dataList
    changeDataList(arr) {
      this.flightsData.flights = arr;
      console.log(arr, 'gg')
      this.total = arr.length;
      this.pageIndex = 1;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
 
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .flights-content {
    width: 745px;
    font-size: 14px;
  }
  .pages {
    margin-bottom: 12px;
    text-align: center;
  }
  .aside {
    width: 240px;
  }
}
</style>