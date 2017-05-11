<template>
  <div>
    <nav-bar></nav-bar>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in [topprojectgroup[topprojectgroup.length-1],topprojectgroup[topprojectgroup.length-2],topprojectgroup[topprojectgroup.length-3],topprojectgroup[topprojectgroup.length-4]]" :key="item">
        <h3><router-link :to="'/projectdetail'+'/'+item.pname"><img :src="item.ppic" width="20%"></router-link></h3>
      </el-carousel-item>
    </el-carousel>
    <el-row class="cardgroup" :gutter="24">
      <el-col :span="20">
        <div v-if="projectgroup[0]==null">
          <img src="https://speckycdn-sdm.netdna-ssl.com/wp-content/uploads/2011/05/notfound.jpg">
          <!-- <span>Nothing found... Try another keyword.</span> -->
        </div>
        <div v-else>
        <el-col class="card" :span="5" v-for="(pro, index) in projectgroup" :key="pro" :offset="index > 0 ? 1 : 1">
          
          <el-card :body-style="{ padding: '10px' }" class="cardbody">
            <router-link :to="'/projectdetail'+'/'+pro.pname">
              <img :src="pro.ppic" class="image">
            </router-link>

              
              <div style="padding: 14px;">
                <el-row>
                  <span>{{pro.pname}}</span>
                </el-row>
                <el-row><span>Status: {{pro.pstatus}}</span></el-row>

                <div class="bottom clearfix">
                  <time class="time">released at {{ (new Date(pro.postime).getMonth()+1) + '/' +new Date(pro.postime).getDate() + '/' + new Date(pro.postime).getFullYear() }}</time>
                  <router-link :to="'/projectdetail'+'/'+pro.pname">
                    <el-button type="text" class="button">Detail</el-button>
                  </router-link>
                </div>
              </div>
          </el-card>
        </el-col>
        </div>
      </el-col>
      <el-col :span="4">
        <side-bar></side-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavBar        from '../common/nav-bar'
import SideBar       from '../common/side-bar'
export default {
  name: 'Project-view',
  created(){ // 组件创建时调用
    console.log(localStorage.getItem('demo-token'))
    let obj = (this.$route.params.keyword!=null) ? {keywordOfPname: this.$route.params.keyword}:{};
    const proGroup = this.getProjectGroup(obj); // 新增一个获取project的方法
    if(proGroup != null){
      this.projectgroup = proGroup;
      console.log(this.projectgroup)
    }else{
      this.projectgroup = [];
    }
  },
  data () {
    return {
      value5: 0.0,
      currentDate: new Date(),
      projectgroup: [],
      topprojectgroup: [],
      like: []
    }
  },
  watch: {
    like (){
      console.log()
    }
  },
  methods: {
      getProjectGroup(obj){ // 获取用户信息
        this.$http.post('/api/project/getProjects', obj) // 将信息发送给后端
          .then((res) => {
            console.log(res.data);
            this.projectgroup=res.data
          
            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
        this.$http.post('/api/project/getProjects', {}) // Top project
          .then((res) => {
            console.log(res.data);
            this.topprojectgroup=res.data
          
            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      log(string){

        console.log(localStorage.getItem('id'))
        this.$http.post('/api/log/create', {uid: localStorage.getItem('id'),lcontent: string, ltype: 'history'})
        .then((res) => {
            console.log(res.data);})
      }
      
      

  },

  components:{
    NavBar,
    SideBar
  }
  // preFetch: fetchUser,
  // beforeMount () {
  //   fetchUser(this.$store)
  // }
}
</script>

<style lang="stylus" scoped>
  .el-carousel{
    margin: 15px
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .cardgroup{
    margin-left:20%
    margin-right:0%
  }
  .card {
    width: 20%
    height: 320px
    margin-bottom: 2%
  }
  .cardbody{
    height: 320px
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .tac{
    margin-right: 10%
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
 
  
  .clearfix:after {
      clear: both
  }
</style>
