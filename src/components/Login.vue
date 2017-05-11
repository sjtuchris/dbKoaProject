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
  created(){ // 组件创建时调用
    console.log(localStorage.getItem('demo-token'))
    if(localStorage.getItem('demo-token') != null){
      this.$router.push('/projectview')
    }
  },
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
          console.log(res.data);
          if(res.data.success){ // 如果成功
            localStorage.setItem('demo-token',res.data.token);
            localStorage.setItem('demo-token',res.data.token);

            localStorage.setItem('name',res.data.name);
            localStorage.setItem('id',res.data.id) // 用localStorage把token存下来

            let nameobj={uname: localStorage.getItem('name')}

              this.$http.post('/api/user/info', nameobj) // 将信息发送给后端
                .then((res) => {
                  // console.log(res);
                  localStorage.setItem('email',res.data.uemail);
                  localStorage.setItem('city',res.data.ucity);
                  localStorage.setItem('occupation',res.data.uoccupation);
                  localStorage.setItem('picurl',res.data.upic);

                })

            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Login successfully！'
            });
            this.$router.push('/projectview') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            localStorage.setItem('demo-token',null); // 将token清空
            localStorage.setItem('name',null); // 将token清空
            localStorage.setItem('id',null);
          }
        }, (err) => {
            this.$message.error('Oops, try again later！')
            localStorage.setItem('demo-token',null); // 将token清空
            localStorage.setItem('name',null); // 将token清空
            localStorage.setItem('id',null);

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