<template>
  <div>
    <nav-bar></nav-bar>

    <el-row class="proinfo" :gutter="24">
      <el-col :span="4" class="proimg">
         <el-card :body-style="{ padding: '10px' }">
            <img :src="project[0].ppic" class="image">

            <el-button class="like" type="danger" v-bind:plain="!like" icon="star-on" @click="togglelike">Like</el-button>
          </el-card>

      </el-col>
      <el-col :span="11" class="">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="panel-group">

              <div class="panel panel-success">
                <div class="panel-body">
                  <div class="sponsor">
                    <h3>{{project[0].pname}}</h3>

                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-body">
                  <div class="sponsor">
                    <h4>Owner</h4>
                    <router-link :to="'/userspace/'+ownerinfo.uname">
                      <img :src="ownerinfo.upic" width="40" height="40">
                      <div class="sponsor-content">
                        <strong>{{ownerinfo.uname}}</strong>
                        <span>released at {{(releasedays.getMonth()+1) + '/' +releasedays.getDate() + '/' + releasedays.getFullYear()}}</span>
                      </div>
                    </router-link>
                    <el-button class="like" type="success" :plain="!follow" @click="followOwner">follow</el-button>
                    <el-row v-if="project[0].pownid==userid">
                      <el-button type="default" class="editbutton" icon="edit" @click="updateProject">Edit Your Project</el-button>
                    </el-row>
                  </div>
                </div>
              </div>

              <router-link v-if="project[0].pstatus!='successful'" :to="'/pledge/'+project[0].pname">
              <el-button type="success" class="pledge" data-dismiss="modal">Pledge this project!</el-button>
              </router-link>

              <el-button v-else type="danger" class="pledge" data-dismiss="modal">Pledge Disabled</el-button>
              </router-link>

            </div>
          </el-col>


          <el-col :span="12">
              <h5>Progress</h5>

              <el-row>
                <el-progress v-if="project[0].pstatus=='successful'" type="circle" :percentage="25" ></el-progress>
                <el-progress v-else type="circle" :percentage="1" ></el-progress>
              </el-row>
              <el-row v-if="project[0].pstatus=='successful'">
              <el-rate 
                v-model="giverate"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                show-text
                :texts="['1','2','3','4','5']"
                text-color="#ff9900"
                >
              </el-rate>
              <span>Put Your Rate here</span>
              </el-row>
              <el-rate
                v-model="rate"
                disabled
                show-text
                text-color="#ff9900"
               >
              </el-rate>
              <span>Average Rate for now</span>

              <div class="tag">
                <el-tag v-if="tag[0]!=null" type="primary">{{tag[0].tname}}</el-tag>
                <el-tag v-if="tag[1]!=null" type="success">{{tag[1].tname}}</el-tag>
                <el-tag v-if="tag[2]!=null" type="warning">{{tag[2].tname}}</el-tag>
                <el-tag v-if="tag[3]!=null" type="danger">{{tag[3].tname}}</el-tag>
                <el-tag v-if="tag[4]!=null"type="gray">{{tag[4].tname}}</el-tag>

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
            <div class="panel-heading">Description</div>
            <div class="panel panel-default">
              <div class="panel-body">{{project[0].pdescription}}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>

    <el-row :gutter="24" class="commentgroup">
      <el-row class="comment" v-for="(comment,index) in commentgroup.comment">

        <div class="container">
          <div class="row">
            <div class="col-sm-1">
              <div class="thumbnail">
                <img class="img-responsive user-photo" :src="commentgroup.dict[commentgroup.comment[index].uid].upic">
              </div><!-- /thumbnail -->
            </div><!-- /col-sm-1 -->

            <div class="col-sm-5">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <strong>
                    
                    {{commentgroup.dict[commentgroup.comment[index].uid].uname}}
                  </strong> 
                  <span class="text-muted">{{comment.ctime}}</span>
                </div>
                <div class="panel-body">
                {{comment.ccontent}}
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
                      <textarea placeholder="What do you think about this project?" v-model="ccontent"></textarea>
                      <ul>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Audio"><i class="fa fa-music"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Video"><i class="fa fa-video-camera"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Sound Record"><i class="fa fa-microphone"></i></a></li>
                        <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
                      </ul>
                      <button type="submit" class="btn btn-success green" @click="submitComment"><i class="fa fa-share"></i> Comment</button>
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
    let obj = {pname: this.$route.params.pid};
    const pro = this.getProject(obj); // 新增一个获取project的方法
    

  },
  data () {
    return {
      rate: '',
      giverate: '',
      project: [],
      tag: [],
      ownerinfo: '',
      releasedays: new Date(),
      like: false,
      userid: localStorage.getItem('id'),
      commentgroup: [],
      ccontent: '',
      follow: false,
      name: []
    }
  },
  computed:{
    sortedComment: function() {
      function compare(a, b) {
        if (a.ctime < b.ctime)
          return -1;
        if (a.ctime > b.ctime)
          return 1;
        return 0;
      }

      return this.commentgroup.comment.sort(compare);
    }
  },
  watch: {
    giverate (){
      console.log(this.giverate)
      let rateobj={uid: this.ownerinfo.uid, pid: this.project[0].pid, rpoint: this.giverate}
      this.insertRate(rateobj);
    }
  },

  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      bindname(obj, index, usersobj){
        console.log(obj)
        let i={}
        for (i in usersobj) {
          if (obj.uid==i.uid){
            this.name[index]=i.uname
          }
        }
      },
      getProject(obj){ 
        this.$http.post('/api/project/getProjects', obj) // get project info
          .then((res) => {
            if(res.data == []){
              this.$router.push('/projectview')
            }
            this.project=res.data
            this.releasedays=new Date(res.data[0].postime)
                          console.log(res.data[0].pownid);
                            console.log("test");

            this.$http.post('/api/user/infoid', {uid: res.data[0].pownid}) // get ownername using pownid
            .then((res) => {
                            console.log("test");

              console.log(res.data);

              this.ownerinfo=res.data     
              }, (err) => {
                  this.$message.error('Oops, try again later！')

            })

            this.$http.post('/api/log/create', {uid: localStorage.getItem('id'),lcontent: this.project[0].pid, ltype: 'history'})
            .then((res) => {
            console.log(res.data);})

            this.$http.post('/api/rate/getrate', {needAverage: "true", pid: this.project[0].pid}) // get rate using pid
            .then((res) => {
              console.log(res.data);

              this.rate=(res.data.average==null) ? 0 : res.data.average
              }, (err) => {
                  this.$message.error('Oops, try again later！')

            })  

            this.$http.post('/api/projectType/getType', {pid: res.data[0].pid}) // get tag using pownid
            .then((res) => {
              console.log(res.data);

              this.tag=res.data     
              }, (err) => {
                  this.$message.error('Oops, try again later！')

            })

            this.$http.post('/api/comment/get', {pid: res.data[0].pid}) // get tag using pownid
            .then((res) => {
              console.log(res.data);

              this.commentgroup=res.data     
              }, (err) => {
                  this.$message.error('Oops, try again later！')

            })

            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      },
      updateProject(){
        this.$router.push('/modifyproject/'+this.project[0].pid) 
      },
      insertRate(rate){
        this.$http.post('/api/rate/giverate', rate) // get ownername using pownid
            .then((res) => {
              console.log(res.data);
              if(res.data.success){
              this.$message({ // 登录成功，显示提示语
                type: 'success',
                message: 'Rate successfully！'
              })};              
            }, (err) => {
                  this.$message.error('Oops, try again later！')

            })
      },
      togglelike() {
        if(this.like=="true"){
          this.like=false
          this.cancelikepro(this.project[0].pid)
        } else {
          this.like=true
          this.likepro(this.project[0].pid)
        }
      },
      likepro(pid){

        this.$http.post('/api/like/giveLike', {uid: localStorage.getItem('id'), pid: pid, like_dislike: "y"}) // 将信息发送给后端
          .then((res) => {
            console.log(res.data);

            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      },
      cancellikepro(pid){
        this.$http.post('/api/like/cancelLike', {uid: localStorage.getItem('id'), pid: pid}) // 将信息发送给后端
          .then((res) => {
            console.log(res.data);
            this.like=false
          
            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      },
      submitComment(){
        let obj={
          uid:localStorage.getItem('id'),
          pid:this.project[0].pid,
          ccontent:this.ccontent
        }
        this.$http.post('/api/comment/create', obj) // get ownername using pownid
          .then((res) => {
            console.log(res.data);
            if(res.data.success){
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Comment successfully！'
            })
            
            this.$router.push('/projectdetail/'+this.$route.params.pid)
          }else{
                this.$message.error(res.data.info); // 
              }   
            }, (err) => {
              this.$message.error('Oops, try again later！')

          })
      },
      followOwner(){
        this.$http.post('/api/follow/follow', {uid: localStorage.getItem('id'), followid: this.ownerinfo.uid})
          .then((res) => {
              console.log(res.data);
              if(res.data.success){
              this.$message({ // 登录成功，显示提示语
                type: 'success',
                message: 'Follow successfully！'
              })
              this.follow=true
            }else{
                  this.$message.error(res.data.info); // 
                }   
              }, (err) => {
                this.$message.error('Oops, try again later！')

            })
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
  .like{
    margin-top:5%
    margin-bottom:5%
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .pledge {
    margin-top:5%
    margin-bottom:0px
    margin-left:0%
    width:100%
  }
  .editbutton{
    margin-top: 3%
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