<template>
  <div class="searchForm">
    <!-- tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleChangeTab(index)"
        :class="{active:index===current}"
      ><i :class="item.icon"></i>{{item.name}}</span>
    </el-row>

    <el-form ref="form" :model="form" label-width="80px" class="Form">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 当输入框输入值时候触发搜索建议事件 -->
        <!-- select：选中下拉框时候触发，参数是选中的参数对象 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="选择日期"
          style="width:100%"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" class="submit" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  data() {
    return {
      current: 0,
      tabs: [{icon:'iconfont icondancheng',name:"单程"},{icon:'iconfont iconshuangxiang',name: "往返"}],
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    handleChangeTab(index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
      //   this.current = index;
    },
    // 出发城市输入框获得焦点是触发
    // value 是输入框的值
    // cb是回调函数  参数必须是一个数组，对象中必须包含value值
    queryDepartSearch(value, cb) {
      if (!value.trim()) {
        cb([]);
        return;
      }
      this.$axios({
        method: "GET",
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        var newdata = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        this.form.departCity = newdata[0].value
        this.form.departCode = newdata[0].sort
        cb(newdata);
      });
      console.log(value);
    },
    // 到达城市输入框获得焦点触发
    queryDestSearch(value, cb) {
      if (!value.trim()) {
        cb([]);
        return;
      }
      this.$axios({
        method: "GET",
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        var newdata = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          };
        });
        this.form.destCity = newdata[0].value
        this.form.destCode = newdata[0].sort
        cb(newdata);
      });
    },
    // 出发城市下拉选择
    handleDepartSelect(item) {
      console.log(item);
      (this.form.departCity = item.value), (this.form.departCode = item.sort);
    },
    // 到达城市下拉选择
    handleDestSelect(item) {
      (this.form.destCity = item.value), (this.form.destCode = item.sort);
    },
    //确认日期是触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      console.log(value);
    },
    // 切换城市时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.destCity = departCity;
      this.form.destCode = departCode;

      this.form.departCity = destCity;
      this.form.departCode = destCode;
    },
    //提交表单时触发
    handleSubmit() {
      console.log(this.form);
      const rules = {
        departCity: { value: this.form.departCity, message: "请选择出发城市" },
        destCity: { value: this.form.destCity, message: "请选择到达城市" },
        departDate: { value: this.form.departDate, message: "请选择出发日期" }
      };
      // 验证结果，初始值是true
      let valid = true;
      console.log(rules);
      console.log(Object.keys(rules));
      Object.keys(rule).map(v => {
        if (!valid) return;
        //    如果字段值为空
        if (!rules[v].value) {
          valid = false;
          this.$message.warning = rules[v].message;
        }
      });
      if(valid){
          this.$router.push({
              path:'/air/flights',
              query:this.form
          })
      }
    }
  }
};
</script>
 
<style lang="less" scoped >
.searchForm {
  border: 1px solid #ccc;
  border-top: none;
  height: 350px;
  box-sizing: border-box;
  .search-tab {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #eee;
    margin-bottom: 10px;
    i{
        margin-right: 6px;
    }
    span {
      display: inline-block;
      flex: 1;
      cursor: pointer;
    }
    .active {
      background-color: #fff;
      border-top: 3px solid orange;
    }
  }
  .Form {
    padding: 15px 50px 15px 15px;
    position: relative;
  }
  .submit {
    width: 100%;
  }
  .reverse {
    position: absolute;
    top: 35px;
    right: 15px;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: -35px;
      width: 25px;
      height: 1px;
      background: #ccc;
    }

    &:after {
      top: 0;
    }

    &:before {
      top: 60px;
    }

    span {
      display: block;
      position: absolute;
      top: 20px;
      right: 0;
      font-size: 12px;
      background: #999;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;

      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: 10px;
        width: 1px;
        height: 20px;
        background: #ccc;
      }

      &:after {
        top: -20px;
      }

      &:before {
        top: 20px;
      }
    }
  }
}
</style>