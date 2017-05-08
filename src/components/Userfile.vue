<template>
  <div>
    <nav-bar></nav-bar>
    <div class="user-view">
      <div id="form">
        <div class="face-area">
          <h3>Profile</h3>
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
          <img :src="pic" class="avator">
          <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Upload photo</button>

          <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Choose your photo</h4>
                </div>
                <div class="modal-body">
                  <!-- <VueImgInputer v-model="picValue" theme="light" size="middle"></VueImgInputer> -->

                    <!-- action="https://jsonplaceholder.typicode.com/posts/" -->

                  <el-upload
                    class="avatar-uploader"
                    action="/api/upload/postUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="Save">Save</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="user-info">
          <h2>Profile Information</h2>
          <span class="info-title">Username</span><span class="info-detail">{{user.username}}</span><br>
          <span class="info-title">Email</span><span class="info-detail">{{user.email}}</span><br>
          <span class="info-title">City</span><span class="info-detail">{{user.city}}</span><br>
          <span class="info-title">Occupation</span><span class="info-detail">{{user.occupation}}</span><br>
          <span class="info-title">Description</span><span class="info-detail bio">{{user.bio}}</span><br>
        </div>
      <!-- <template v-if="user">
        <h1>User : {{ user.id }}</h1>
        <ul class="meta">
          <li><span class="label">Created:</span> {{ user.created | timeAgo }} ago</li>
          <li><span class="label">Karma:</span> {{user.karma}}</li>
          <li v-if="user.about" v-html="user.about" class="about"></li>
        </ul>
      </template> -->
      </div>
    </div>
  </div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
import NavBar        from '../common/nav-bar'

export default {
  name: 'user-view',
  created(){ // 组件创建时调用
    const userInfo = this.getUserInfo(); // 新增一个获取用户信息的方法
    if(userInfo != null){
      this.user.username = userInfo.name;
      this.user.email = userInfo.email;
      this.user.city = userInfo.city;
      this.user.occupation = userInfo.occupation;
      this.pic = userInfo.pic
      console.log(this.pic)
    }else{
      this.id = '';
      this.name = ''
    }
  },
  data () {
    return {
      user: {
        // paramId: 'user id from params:' + this.$route.params.id,
        username: '',
        email: '',
        city: '',
        occupation: '',
        bio: '*',
        pic:''
      },
      pic:'',
      focused: false,
      picValue: '',

      imageUrl: ''


    }
  },
  watch: {
    imageUrl: function(){
      this.getUserInfo();
      this.pic=sessionStorage.getItem('picurl');
    }
  },
  methods: {

    Save () {
      console.log(this.imageUrl)
    },
    focus () {

    },
    getUserInfo(){ // 获取用户信息
        const name = sessionStorage.getItem('name');
        const city = sessionStorage.getItem('city');
        const occupation = sessionStorage.getItem('occupation');
        const email = sessionStorage.getItem('email');
        const pic = sessionStorage.getItem('picurl')
        if(name != null && name != 'null'){
          // let decode = jwt.verify(token,'vue-koa-demo'); // 解析token
          return {name: name,city: city,occupation: occupation, email: email, pic: pic} // decode解析出来实际上就是{name: XXX,id: XXX}
        }else {
          return null
        }
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res.data.pictureUrl);
        let urlobj = {
          "thisname": sessionStorage.getItem('name'),
          "upic": res.data.pictureUrl
        }
        this.$http.post('/api/user/update', urlobj)
          .then((res) => {
                  console.log(res);
          
                })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('JPG only');
        }
        if (!isLt2M) {
          this.$message.error('Avator must be smaller than 2MB!');
        }
        return isJPG && isLt2M;
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
.user-view
  width 720px
  margin-top 50px
  margin-left auto
  margin-right auto
  padding 0
  padding-bottom 60px
  #form
    .face-area
      width 100px
      margin auto
      text-align center
      font 12px/1.3 'Arial','Microsoft YaHei'
      img
        width 100px
        height 100px
        display block
        margin-bottom 20px
        border-radius 100%
      .focus
        width 92px
        height 32px
        display inline-block
        text-align center
        font 12px/1.3 'Arial','Microsoft YaHei'
        font-size 14px
        word-spacing 2px
        color #fff
        box-shadow 0px 1px 2px rgba(0, 0, 0, 0.3)
        border-radius 3px
        background-color #f4722e
        border 1px solid #f4722e
        cursor pointer
    .user-info
      margin-top 50px
      margin-left 110px
      padding-right 60px
      font 12px/1.3 'Arial','Microsoft YaHei'
      h2
        padding-bottom 8px
        border-bottom 1px solid #d1d1d1
        font 18px/1.3 'Arial','Microsoft YaHei'
        font-weight 600
      span
        line-height 36px
      .info-title
        width 80px
        float left
        text-align right
        font-size 20px
        color #808080
      .info-detail
        display block
        margin-left 80px
        font-size 18px
        color #333

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
