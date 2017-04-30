<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       Welcome! 
      </span>
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
        <el-button type="primary" @click="loginToDo">Register</el-button>

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
      this.$http.post('/auth/user', obj) // 将信息发送给后端
        .then((res) => {
          console.log(res);
          if(res.data.success){ // 如果成功
            sessionStorage.setItem('demo-token',res.data.token);
            sessionStorage.setItem('name',res.data.name); // 用sessionStorage把token存下来

            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Login successfully！'
            });
            this.$router.push('/todolist') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            sessionStorage.setItem('demo-token',null); // 将token清空
            sessionStorage.setItem('name',null); // 将token清空
          }
        }, (err) => {
            this.$message.error('Oops, try again later！')
            sessionStorage.setItem('demo-token',null); // 将token清空
            sessionStorage.setItem('name',null); // 将token清空

        })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 46%
    margin-top 12px    
</style>