<template>
  <div class="register">
    <el-form :model="form" status-icon :rules="rules" ref="form" class="Form">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="form.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" placeholder="确认密码" v-model="form.checkPass"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm" class="submit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入你的昵称", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   验证手机号
    handleSendCaptcha() {
      if (!this.form.username.trim()) {
        this.$confirm("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.form.username.length !== 11) {
        this.$confirm("请输入正确的手机号", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$store.dispatch("user/sendCode", this.form.username).then(res => {
        console.log(res);
        // const { code } = res.data;
        this.$confirm(`模拟的手机验证码为${res}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "success"
        });
      });
    },
    // 提交注册按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
        //   查找除了checkPass以外的所有元素
          const {checkPass, ...props} = this.form
          this.$axios({
              url:'/accounts/register',
              method:'POST',
              data:props
          }).then(res=>{
              console.log(res);
              this.$store.commit("user/setUserInfo",res.data)
              this.$router.push('/')
          })
        }
      });
    }
  }
};
</script>
 
<style lang="less" scoped>
.Form {
  padding: 25px;
}
</style>