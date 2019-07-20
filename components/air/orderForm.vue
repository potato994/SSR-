<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <el-select slot="prepend" value="成人" placeholder="请选择">
                <el-option label="成人" value="2"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <!-- 移出乘机人按钮 -->
          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
        <el-checkbox
          :label="`${item.type}：￥${item.price}/份*1  最高赔付${item.compensation}`"
          @change="handleIsurances(item)"
        ></el-checkbox>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入验证码" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="allPrice">
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [], //保险id
      contactName: "", // 联系人名字
      contactPhone: "", // 联系人电话
      invoice: false, // 是否需要发票
      seat_xid: "", // 座位id
      air: "", // 航班id
      captcha: "",
      infoData: {
        //接口返回的数据集合
        insurances: [],
        seat_infos: {}
      }
    };
  },
  computed: {
    // 计算总价格
    allPrice() {
      if (!this.infoData.airport_tax_audlet) return "";

      let price = 0;
      // 单价
      price += this.infoData.seat_infos.org_settle_price;
      // 建机燃油费
      price += this.infoData.airport_tax_audlet;
      // 保险
      price += this.insurances.length * 30;
      // 人数
      price *= this.users.length;
      this.$store.commit("air/setAllPrice", price);
      return price;
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },
    // 移出乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 拼接保险的数据
    handleIsurances(item) {
      console.log(item);
      // 判断数组中是否存在id
      const index = this.insurances.indexOf(item.id);
      console.log(index);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(item.id);
      }
      console.log(this.insurances);
    },
    // 发送手机验证码
    handleSendCaptcha() {
      this.$store.dispatch("user/sendCode", this.contactPhone).then(res => {
        console.log(res);
        this.$confirm(`模拟手机验证码为${res}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };

      // 自定义规则验证
      const rules = {
        users: {
          value: this.users,
          message: "乘机人不能为空"
        },
        contactName: { value: this.contactName, message: "联系人不能为空" },
        contactPhone: { value: this.contactPhone, message: "联系电话不能为空" },
        captcha: { value: this.captcha, message: "手机验证码不能为空" }
      };
      let invalid = true;
      // 循环验证表单的数据
      Object.keys(rules).forEach(v => {
        if (!invalid) return;

        if(v === "users"){
          // 判断循环是不是每个用户username和id都是有值的
          rules[v].value.map(user=>{
            if(!invalid) return
            // (user) rules里面的user数组每一项
            if(!(user.username && user.id)){
              invalid = false;
              this.$message.warning(rules[v].message)
            }
          })
        }

        if (!rules[v].value) {
          invalid = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (!invalid) return;
      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        // 添加授权的头信息
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        const {data} = res.data
        console.log(data);
        console.log(data.id);
        this.$message.success("订单提交成功，正在跳转...");
        this.$router.push('/air/pay?id='+data.id)
      });
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res);
      this.infoData = res.data;

      // 保存给store
      this.$store.commit("air/setInfoData", res.data);
    });
  }
};
</script>
 
<style lang="less" scoped>
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}
/deep/ .el-select .el-input {
  width: 130px;
}
.input-with-select {
  width: 590px;
}
.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}
.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;
  &:first-child {
    .delete-user {
      display: none;
    }
  }
}
.add-member {
  margin-top: 20px;
}
.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}
.insurance {
  > div {
    margin-top: 10px;
  }
}
.insurance-item {
  margin-bottom: 20px;
}
.contact {
  /deep/ .el-input {
    width: 50%;
  }
}
.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>