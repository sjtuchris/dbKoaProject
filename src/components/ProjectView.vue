<template>
  <div>
    <nav-bar></nav-bar>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 5" :key="item">
        <h3><img :src="projectgroup[item].ppic" width="20%"></h3>
      </el-carousel-item>
    </el-carousel>
    <el-row class="cardgroup" :gutter="24">
      <el-col :span="20">
        <el-col class="card" :span="5" v-for="(pro, index) in projectgroup" :key="pro" :offset="index > 0 ? 1 : 1">
        
          <el-card :body-style="{ padding: '10px' }">
            <img :src="pro.ppic" class="image">
            <div style="padding: 14px;">
              <span>{{pro.pname}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ pro.postime }}</time>
                <el-button type="text" class="button">Detail</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
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
    let obj = {};
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
      currentDate: new Date(),
      projectgroup: []

    }
  },
  methods: {
      getProjectGroup(obj){ // 获取用户信息
        this.$http.post('/api/project/getProjects', obj) // 将信息发送给后端
          .then((res) => {
            console.log(res.data);
            this.projectgroup=res.data
            // if(res.data.success){ // 如果成功
                
            //     this.$message({ // 登录成功，显示提示语
            //       type: 'success',
            //       message: 'Posted successfully！'
            //     });
            //     alert('submit!');

            //     this.$router.push('/projectview') 
            // }else{
            //     this.$message.error(res.data.info); // 
            //   }
            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
    //width: 25%
    margin-bottom: 2%
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
