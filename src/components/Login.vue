<template>

  <el-row class="content">

    <el-col :xs="24" :sm="{span: 6,offset: 9}" :md="{span: 6,offset: 9}" :lg="{span: 6,offset: 9}">
      <img class="img" src="../assets/images.png">

      <span class="title">&nbsp</span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="Account"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="Password"
          type="password"
          @keyup.enter.native="loginToDo">
        </el-input>
        <el-button type="primary" @click="loginToDo">Sign in</el-button>
        <el-button type="primary" @click="register">Register</el-button>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    loginToDo() {
      let obj = {
        uname: this.account,
        upassword: this.password
      }
      this.$http.post('/auth/login', obj) // 将信息发送给后端
        .then((res) => {
          console.log(res);
          if(res.data.success){ // 如果成功
            sessionStorage.setItem('demo-token',res.data.token);
            sessionStorage.setItem('name',res.data.name);
            sessionStorage.setItem('id',res.data.id) // 用sessionStorage把token存下来


            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Login successfully！'
            });
            this.$router.push('/test') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            sessionStorage.setItem('demo-token',null); // 将token清空
            sessionStorage.setItem('name',null); // 将token清空
            sessionStorage.setItem('id',null);
          }
        }, (err) => {
            this.$message.error('Oops, try again later！')
            sessionStorage.setItem('demo-token',null); // 将token清空
            sessionStorage.setItem('name',null); // 将token清空
            sessionStorage.setItem('id',null);

        })
    },
    register(){
      this.$router.push('/Register')
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .img

    left:12%
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 46%
    margin-top 12px    
</style>