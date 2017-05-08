<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <span class="title"><img class="img" src="../assets/download.png" height="45px"></span>
    <el-form-item label="Username" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="Your City" prop="city">
      <el-input v-model="ruleForm.city"></el-input>
    </el-form-item>
    <el-form-item label="Occupation" prop="occupation">
      <el-input v-model="ruleForm.occupation"></el-input>
    </el-form-item>
    
    <el-form-item label="Descrition" prop="desc">
      <el-input type="textarea" placeholder="Decrisbe yourself" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Register</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email: '',
          password: '',
          city: '',
          occupation: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: 'Please choose your username', trigger: 'blur' },
            { min: 1, message: 'At least one word', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please choose your email', trigger: 'blur' },
            { min: 3, message: 'Not valid', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please type in your password', trigger: 'change' },
            { min: 3, message: 'Too short', trigger: 'blur' }
          ],
          city: [
            { required: true, message: 'Describe the city you live in', trigger: 'change' }
          ],
          occupation: [
            { required: true, message: 'Please type in your occupation', trigger: 'change' }
          ],
          desc: [
            { required: true, message: 'Decribe yourself', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj={
              uname:        this.ruleForm.name,
              uemail:        this.ruleForm.email,
              ucity:        this.ruleForm.city,
              uoccupation:  this.ruleForm.occupation,
              upassword:    this.ruleForm.password
            }
            this.$http.post('/auth/login/reg', obj) // 将信息发送给后端
              .then((res) => {
                console.log(res);
                if(res.data.success){ // 如果成功
                  this.$message({ // 登录成功，显示提示语
                    type: 'success',
                    message: 'Register successfully！'
                  });
                  this.$router.push('/') // 进入todolist页面，登录成功
                }else{
                  this.$message.error(res.data.info); // 登录失败，显示提示语
                }
              }, (err) => {
                  this.$message.error('Oops, try again later！')

              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-form
    position:absolute;
    top:20%;
    left:30%;
    right:30%;
    padding:15px;

  .title
    position:absolute;
    font-size 20px
    top:-50px
    left:30%
    right:30%



    
</style>