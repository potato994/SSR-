<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 菜单导航 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!--右侧消息 -->
      <div class="msg">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class=" el-icon-message"></i>
            消息
            <i class=" el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 右侧的登录注册 -->
      <div class="denglu">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>

      <div class="login" v-if="false">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
            potato
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
 
<script>
</script>
 
<style lang='less' scoped>
.container {
  box-shadow: 0 2px 2px #ddd;
}
.main {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}
.logo {
  margin-right: 20px;
  img {
    width: 156px;
    height: 42px;
    margin-top: 9px;
  }
}

.navs {
  flex: 1;
  a {
    padding: 0 20px;
    &:hover {
      border-bottom: 5px solid #409eff;
      color: #409eff;
    }
  }
  .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;
  }
}

.el-dropdown-link img {
  width: 36px;
  height: 36px;
  vertical-align: middle;
}
.msg {
  cursor: pointer;
  margin-right: 20px;
}
.denglu {
  font-size: 15px;
}
.login {
  cursor: pointer;
}
</style>



