<template>
  <div class="login-container ">
    <div class="center-box">
      <div class="welcome"><span>登录</span></div>
      <div class="form-box">

        <Form ref="formValidate" :model="formLogin" :rules="ruleValidate" class="form">
          <!--<Form ref="formValidate" :model="formLogin" class="form">-->
          <!--直接使用Form-item标签会报错，不知道之前的工程为啥可以使用，是自定义标签？-->
          <form-item prop="account">

            <!--<Input type="text" v-model="formLogin.account" placeholder="账号" @on-enter="handleSubmit('formValidate')">-->
            <Input type="text" v-model="formLogin.account" placeholder="账号">
            </Input>
          </form-item>
          <form-item prop="password">
            <!--<Input type="password" v-model="formLogin.password" placeholder="密码" @on-enter="handleSubmit('formValidate')">-->
            <Input type="password" v-model="formLogin.password" placeholder="密码" ></Input>

          </form-item>
          <!--<Form-item v-show="!loginLoading">-->
          <div><Button type="primary" @click="handleSubmit('formValidate')">登录</Button></div>
          <!--</Form-item>-->
        </Form>
      </div>
    </div>
  </div>
</template>

<!--<script src="https://unpkg.com/vee-validate@2.0.0-rc.7">-->
<script>
  //登录/Login界面空白，刷新三四次才出来一次，和路由拦截死循环有关，会报错RangeError: Maximum call stack size exceeded

  export default {
    name: "Login",
    data(){
      return{
        formLogin:{
          account:"",
          password:""
        },
        //saffafdafafda
        formValidate: {},
        ruleValidate: {
          account: [
            {required: true, message: '请填写帐号', trigger: 'blur'},
            {type: 'string', min: 1, message: '帐号长度不能低于3位', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'}
            //, {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        loginLoading:false
      };
    },
    methods:{
      // handleSubmit(name) {
      handleSubmit(name) {
        // console.log('333333333333333');
        // this.$refs[name].validate((valid) => {
        // this.$refs.formValidate.validate((valid) => {
        // this.$refs.name.validate((valid) => {
        //   console.log('4444444444444');
        if (true) {
          // console.log('555555555555555555');
          this.loginLoading = true;
          let params = {userName: this.formLogin.account, password: this.formLogin.password};

          this.request('validateLogin', params).then((res) => {
            if (res.state === 200) {
              window.localStorage.setItem('loginToken', JSON.stringify(this.formLogin));
              setTimeout(() => {
                this.$router.push({path: '/index'});
              }, 1000);
            } else {
              // this.loginLoading = false;
              // this.$Message.error('MMP,用户名或密码错误');
              // this.$Modal.remove();
              // this.$router.push({path: '/login'});
            }
          }).catch((err) => {
            console.log(err);
            // this.loginLoading = false;
            // this.$Message.error('MMP,用户名或密码错误');
            // this.$Modal.remove();
            // this.$router.push({path: '/login'});
          });
        } else {
          // this.$Message.error('卧槽，表单验证失败!');
        }
        // });
      }
    }
  }
</script>
<style scoped>
  @import url("//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css");
  .login-container {
    background-color: #009898;
    position: relative;
    align-items: center;
  /*// min-height: 100 vh;*/
  /*// min-width: 100 vh;*/
  /*. linearGradient(#3AB1E9, #145EBD);*/
  /*// overflow: hidden;*/
    height: 100%;
  }

  .center-box {
    height: 50%;
    display: flex;
    flex-direction: column;
  position: relative;
    z-index: 99;
  /*min-height: 50%;*/
  /*min-width: 80%;*/
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    overflow: hidden;
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

  .form-box {
    border-radius: 10px;
    width: 360px;
    min-height: 250px;
    border: 1px solid #E7E7E7;
    background: #ffffff;
  }

  .form {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .code-img {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 50px;
    cursor: pointer;
  }

</style>
<!--<style scoped src="@/assets/style/Login.less" lang="less" type="text/css"></style>-->
