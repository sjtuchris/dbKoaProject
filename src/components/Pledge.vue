<template>
  <div>
    <nav-bar></nav-bar>
    <el-row class="postframe">
      <div class="panel-group">
        <div class="panel panel-primary">
          <div class="panel-heading">Post Your Project</div>
          <div class="panel panel-default">
            <div class="panel-body">

                        Choose your card to pay: 
              <el-row>
                <img style="width: 40%" src="/static/album/visa.png">
              </el-row>

            <el-row class="selecionGroup">
              <el-select v-model="cnum" placeholder="Choose a card">
                <el-option
                  v-for="item in cards"
                  :key="item"
                  :label="item.cnum"
                  :value="item.cnum">
                </el-option>
              </el-select>
            </el-row>
                        Type the amount: 

            <el-row class="input">
              <el-input v-model="mamount" placeholder="Amount to pledge"></el-input>
            </el-row>
            <el-button style="margin-top:3%" type="primary" @click="pledge">Pledge Now!</el-button>

            </div>
          </div>
        </div>
      </div>
    </el-row>
  
  </div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
import NavBar        from '../common/nav-bar'

export default {
  name: 'user-view',
  created(){ // 组件创建时调用
    this.getCardInfo()
  },
  data () {
    return {
      cards: [],
      cnum: '',
      mamount: '',
      pid:''
    }
  },
  watch: {
  },
  methods: {
    getCardInfo(){ // 获取用户信息
      this.$http.post('/api/card/cardlist', {uid: localStorage.getItem('id')}) // get ownername using id
          .then((res) => {
            this.cards=res.data

            this.$http.post('/api/project/getProjects', {pname: this.$route.params.pid}) // get project info
              .then((res) => {
                this.pid=res.data[0].pid
                              console.log(this.pid);

              }, (err) => {
                  this.$message.error('Oops, try again later！')

            }) 
          }, (err) => {
            this.$message.error('Oops, try again later！')

      })
    },
    pledge(){
      let obj={
        uid: localStorage.getItem('id'),
        cnum: this.cnum,
        pid: this.pid,
        mamount: this.mamount
      }
      this.$http.post('/api/money/giveMoney', obj) // get ownername using id
            .then((res) => {
            if(res.data.success){
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Pledge successfully！'
            })
            
            this.$router.push('/projectdetail/'+this.$route.params.pid)
          }else{
                this.$message.error("Empty slot"); // 
              }   
            }, (err) => {
              this.$message.error('Oops, try again later！')

      })
    }    

  },

  components:{
    VueImgInputer,
    NavBar
  }
  // preFetch: fetchUser,
  // beforeMount () {
  //   fetchUser(this.$store)
  // }
}
</script>

<style lang="stylus" scoped>
.postframe{
  text-align:left
  margin-top: 5%
  margin-left: 40%
  margin-right: 40%
}
.selecionGroup{
  margin-top: 2%
}
.input{
  margin-top:2%
  width: 55%
}
</style>
