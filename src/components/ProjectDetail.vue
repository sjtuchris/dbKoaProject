<template>
  <div>
    <nav-bar></nav-bar>

    <el-row class="proinfo" :gutter="24">
      <el-col :span="4" class="proimg">
         <el-card :body-style="{ padding: '10px' }">
            <img src="../assets/logo.png" class="image">
       
          </el-card>

      </el-col>
      <el-col :span="11" class="">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="panel-group">

              <div class="panel panel-success">
                <div class="panel-body">
                  <div class="sponsor">
                    <h3>Name</h3>

                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="sponsor">
                    <h4>Owner</h4>
                    <img src="../assets/logo.png" width="40" height="40">
                    <div class="sponsor-content">
                      <strong>Ownername</strong>
                      <span>released n days ago</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </el-col>


          <el-col :span="12">
              <h5>Progress</h5>

              <el-progress type="circle" :percentage="25" ></el-progress>
              <el-rate
                v-model="value5"
                disabled
                show-text
                text-color="#ff9900"
                text-template="{value}">
              </el-rate>
              <div class="tag">
                <el-tag>标签一</el-tag>
                <el-tag type="gray">标签二</el-tag>
                <el-tag type="primary">标签三</el-tag>
                <el-tag type="success">标签四</el-tag>
                <el-tag type="warning">标签五</el-tag>
                <el-tag type="danger">标签六</el-tag>
              </div>
          </el-col>

        </el-row>
      </el-col>
      <el-col :span="4">
            <side-bar></side-bar>

      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="10" class="description">

        <div class="panel-group">
          <div class="panel panel-primary">
            <div class="panel-heading">Panel Content</div>
            <div class="panel panel-default">
              <div class="panel-body">Panel Content</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>

    <el-row :gutter="24" class="commentgroup">
      <el-row class="comment" v-for="n in 4">

        <div class="container">
          <div class="row">
            <div class="col-sm-1">
              <div class="thumbnail">
                <img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
              </div><!-- /thumbnail -->
            </div><!-- /col-sm-1 -->

            <div class="col-sm-5">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <strong>myusername</strong> 
                  <span class="text-muted">commented 5 days ago</span>
                </div>
                <div class="panel-body">
                Panel content
                </div><!-- /panel-body -->
              </div><!-- /panel panel-default -->
            </div><!-- /col-sm-5 -->
          </div>
        </div>

      </el-row>

      <el-row class="commentbox">

        <div class="container">         
            <div class="row">            
              <div class="col-md-6">
                <div class="widget-area no-padding blank">
                  <div class="status-upload">
                    <form>
                      <textarea placeholder="What are you doing right now?" ></textarea>
                      <ul>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Audio"><i class="fa fa-music"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Video"><i class="fa fa-video-camera"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Sound Record"><i class="fa fa-microphone"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
                      </ul>
                      <button type="submit" class="btn btn-success green"><i class="fa fa-share"></i> Share</button>
                    </form>
                  </div><!-- Status Upload  -->
                </div><!-- Widget Area -->
              </div>
                
            </div>
        </div>
      </el-row>

    </el-row>

  </div>
</template>

<script>
import NavBar        from '../common/nav-bar'
import SideBar       from '../common/side-bar'
export default {
  name: 'user-view',
  created(){ // 组件创建时调用
  
  },
  data () {
    return {
      currentDate: new Date(),
      name: 'Project Name Here',
      value5: 3.7


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
  .proinfo{
    margin-top:3%
  }
  .proimg{
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
  .description{
    text-align:left
    margin-top:5%
    margin-left:20%
    margin-right: auto
  }

  .commentgroup{
    margin-top:2%
  }
  .comment{
    margin-top:-1%
    margin-left:20%
    margin-right:50%
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .tag{
    margin-top: 6%
  }

  .commentbox{
    margin-left: 20%
    body{ background: #fafafa;}
    .widget-area.blank {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
    box-shadow: none;
    }
    body .no-padding {
    padding: 0;
    }
    .widget-area {
    background-color: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -ms-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    -o-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
    float: left;
    margin-top: 30px;
    padding: 25px 30px;
    position: relative;
    width: 100%;
    }
    .status-upload {
    background: none repeat scroll 0 0 #f5f5f5;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    float: left;
    width: 100%;
    }
    .status-upload form {
    float: left;
    width: 100%;
    }
    .status-upload form textarea {
    background: none repeat scroll 0 0 #fff;
    border: medium none;
    -webkit-border-radius: 4px 4px 0 0;
    -moz-border-radius: 4px 4px 0 0;
    -ms-border-radius: 4px 4px 0 0;
    -o-border-radius: 4px 4px 0 0;
    border-radius: 4px 4px 0 0;
    color: #777777;
    float: left;
    font-family: Lato;
    font-size: 14px;
    height: 142px;
    letter-spacing: 0.3px;
    padding: 20px;
    width: 100%;
    resize:vertical;
    outline:none;
    border: 1px solid #F2F2F2;
    }

    .status-upload ul {
    float: left;
    list-style: none outside none;
    margin: 0;
    padding: 0 0 0 15px;
    width: auto;
    }
    .status-upload ul > li {
    float: left;
    }
    .status-upload ul > li > a {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    color: #777777;
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin: 10px 0 10px 10px;
    text-align: center;
    -webkit-transition: all 0.4s ease 0s;
    -moz-transition: all 0.4s ease 0s;
    -ms-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
    width: 30px;
    cursor: pointer;
    }
    .status-upload ul > li > a:hover {
    background: none repeat scroll 0 0 #606060;
    color: #fff;
    }
    .status-upload form button {
    border: medium none;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    float: right;
    font-family: Lato;
    font-size: 14px;
    letter-spacing: 0.3px;
    margin-right: 9px;
    margin-top: 9px;
    padding: 6px 15px;
    }
    .dropdown > a > span.green:before {
    border-left-color: #2dcb73;
    }
    .status-upload form button > i {
    margin-right: 7px;
    }
  }
</style>