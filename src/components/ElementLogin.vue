<template>
  <el-container class="login">
    <el-header height="300px">
      <div style="min-height: 230px;"></div>
      <div class="welcome"><span>❤❤❤❤❤❤系统</span></div>
    </el-header>
    <el-main class="form-box">
      <el-row type="flex" justify="center">
        <el-form :model="formLogin" status-icon :rules="rules" label-width="50px" ref="ruleForm" class="ruleForm">

          <el-form-item></el-form-item>
          <el-form-item></el-form-item>

          <el-form-item label="账号" prop="account" class="formItem">
            <el-input v-model="formLogin.account" placeholder="请输入账号"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" class="formItem">
            <el-input type="password" v-model="formLogin.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <div><el-button type="primary" @click="submitForm('ruleForm')" plain>登录</el-button></div>
        </el-form>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
    export default {
      name: "ElementLogin",
      methods:{
        submitForm(formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              let params = {userName: this.formLogin.account, password: this.formLogin.password};

              this.request('validateLogin', params).then((res) => {
                if (res.state === 200) {
                  window.localStorage.setItem('loginToken', JSON.stringify(this.formLogin));
                  setTimeout(() => {
                    this.$router.push({path: '/index'});
                  }, 1000);
                }else{
                  console.log('error submit!!');
                  return false;
                }
              })
            }
          })
        }
      },
      data(){
          return{
            formLogin:{
              account:"",
              password:""
            },
            rules:{
              account:[
                // { required: true, message: '请输入账号', trigger: 'blur' },
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                {required: true, message: '请填写帐号', trigger: 'blur'},
                {type: 'string', min: 1, message: '帐号长度不能低于3位', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
              ],
              password:[
                { required: true, message: '请输入密码', trigger: 'blur' }
              ]
            }
          }
      }
    }
</script>

<style scoped>
  @import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
  .login{
    background-image: url("../assets/login_background.jpg");
    width: 100%;
    height: 1000px;
  }
  .welcome {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    font-weight: bold;
    color:#ffffff;
    margin-bottom: 20px;
  }
  .ruleForm{
    border-radius:50px;
    width: 500px;
    min-height: 230px;
    border: 9px solid #cbeaff;
    background: #f5fffa;
  }
  .formItem{
    width:300px;
    height: 60px;
    /*border:1px solid red;*/
    margin:0 auto;
  }
</style>
