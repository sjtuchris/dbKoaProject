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
    loginToDo(){
      this.$router.push('/todolist')
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