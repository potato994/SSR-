<template>
  <div class="lgoinForm">
    <el-form :model="form" :rules="rules" ref="form" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username" ></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password" ></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码？</nuxt-link>
      </p>
      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      form: {
          username:"",
          password:''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
      handleLoginSubmit(){
          this.$refs.form.validate((valid)=>{
              if(valid){
                //  dispatch调用actions下的方法
                this.$store.dispatch("user/login",this.form)
                .then(res=>{
                    this.$message({
                        message:'登录成功，正在跳转',
                        type:'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                    console.log(res);
                })
                  
              }
          })
          console.log(111);
      }
  }
};
</script>
 
<style lang="less" scoped>
.form {
  padding: 25px;

  .form-item {
    font-size: 12px;
    margin-bottom: 20px;
  }
  .form-text {
    font-size: 12px;
    color: #409eff;
    text-align: right;
    line-height: 1;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>