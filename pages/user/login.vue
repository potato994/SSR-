<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部 -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active:current===index}"
            v-for="(item,index) in ['登陆','注册']"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <loginForm v-if="current===0"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import loginForm from "@/components/user/loginForm";
export default {
  components: {
    loginForm
  },
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleChangeTab(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0, 1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 1px #eee solid;
          background-color: #eee;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
        }
        .active {
          background-color: #fff;
          color: #ffa500;
          border-top: 2px solid #ffa500;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
