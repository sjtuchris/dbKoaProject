<template>
  <div>
    <nav-bar></nav-bar>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3><img src="../assets/cat.png" width="10%"></h3>
      </el-carousel-item>
    </el-carousel>
    <el-row class="cardgroup" :gutter="24">
      <el-col :span="20">
        <el-col class="card" :span="5" v-for="(o, index) in 9" :key="o" :offset="index > 0 ? 1 : 1">
          <el-card :body-style="{ padding: '10px' }">
            <img src="../assets/logo.png" class="image">
            <div style="padding: 14px;">
              <span>ProjecDemo</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
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
  
  },
  data () {
    return {
      currentDate: new Date()

    }
  },
  methods: {
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
