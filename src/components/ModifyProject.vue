<template>
  <div>
    <nav-bar></nav-bar>

    <el-row class="postframe">

        <div class="panel-group">
          <div class="panel panel-primary">
            <div class="panel-heading">Modify Your Project</div>
            <div class="panel panel-default">
              <div class="panel-body">
        <el-row>
        <img :src="project[0].ppic">
        </el-row>      	
				<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="Name" prop="name">
				    <el-input v-model="project[0].pname"></el-input>
				  </el-form-item>
				  <el-form-item label="Money Range" prop="max_amount">
				    <el-col :span="11">
				   		<el-input v-model="project[0].min_amount" placeholder="Minimum Amount" prop="min_amount"></el-input>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      	<el-input v-model="project[0].max_amount" placeholder="Maximum Amount" prop="max_amount"></el-input>

				    </el-col>
				  </el-form-item>
				  <el-form-item label="Deadline" required>
				    <el-col :span="11">
				      <el-form-item prop="date1">
				        <el-date-picker type="date" placeholder="Choose Date" v-model="ruleForm.date1" style="width: 100%;" require></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-form-item prop="date2">
				        <el-time-picker type="fixed-time" placeholder="Choose time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
				      </el-form-item>
				    </el-col>
				  </el-form-item>

				  <el-form-item label="Expected Release Time">
            <el-col :span="11">
              <el-form-item prop="">
                <el-date-picker type="date" placeholder="Choose Date"  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="">
                <el-time-picker type="fixed-time" placeholder="Choose time" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>


				  <el-form-item label="Tag" prop="type">
				    <el-checkbox-group v-model="ruleForm.type">
				     	<el-checkbox label="Art" name="type"></el-checkbox>
				    	<el-checkbox label="IT" name="type"></el-checkbox>
				      <el-checkbox label="Education" name="type"></el-checkbox>
				      <el-checkbox label="Entertainment" name="type"></el-checkbox>
							<el-checkbox label="Business" name="type"></el-checkbox>
							<el-checkbox label="Medication" name="type"></el-checkbox>
							<el-checkbox label="Other" name="type"></el-checkbox>
				    </el-checkbox-group>
				  </el-form-item>

				  <el-form-item label="Property" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="Commercial"></el-radio>
				      <el-radio label="Charity"></el-radio>
				    </el-radio-group>
				  </el-form-item>

				  <el-form-item label="Upload" prop="pic">
						<el-upload
						  class="upload-demo"
						  action="/api/upload/postUpload"
						  :on-success="handleSuccess"

						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :file-list="fileList2"
						  list-type="picture">
						  <!-- <el-button size="small" type="primary">Upload</el-button> -->
						  <div slot="tip" class="el-upload__tip">jpg/png only，smaller than 500kb</div>
						</el-upload>
					</el-form-item>

				  <el-form-item label="Description" prop="desc">
				    <el-input type="textarea" v-model="project[0].pdescription"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">Complete!</el-button>
				    <el-button @click="resetForm('ruleForm')">Reset</el-button>
				  </el-form-item>
				</el-form>


              </div>
            </div>
          </div>
        </div>

    </el-row>

  </div>
</template>
<script>
import NavBar        from '../common/nav-bar'
import SideBar       from '../common/side-bar'
export default {
  name: 'post-project',
  created(){ // 组件创建时调用
    let obj = {pid: this.$route.params.pid};
    const pro = this.getProject(obj); // 新增一个获取project的方法

  },
	data() {
		var validateMax = (rule, value, callback) => {
      if (value < this.ruleForm.min_amount) {
          callback(new Error('Max must larger than Min!'));
        } else {
          callback();
        }
      };
    return {
    	fileList2: [],
      ruleForm: {
        name: '',
        min_amount: '',
        max_amount: '',
        region: '',
        date1: '',
        date2: '',
        type: [],
        resource: '',
        desc: '',
        pic: ''
      },
      project: [],
      ownerinfo: '',
      releasedays: new Date(),
      
    };
  },
  methods: {
    submitForm(formName) {

	    let obj = {
      	pid: this.project[0].pid,
        pname: this.project[0].pname,
        pdescription: this.project[0].pdescription,
        pownid: localStorage.getItem('id'),
        min_amount: this.project[0].min_amount,
        max_amount: this.project[0].max_amount,
        fund_endtime: (this.ruleForm.date1==null) ? this.project[0].fund_endtime: this.ruleForm.date1,
        ppic: (this.pic==null) ? this.project[0].ppic : this.pic,
        pstatus: 'active'
      }
			this.$http.post('/api/project/updateProject', obj) // 将信息发送给后端
			  .then((res) => {
	        if(res.data.success){ // 如果成功
	            
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: 'Modified successfully！'
            });
            alert('submit!');

            this.$router.push('/projectview') 
					}else{
	            this.$message.error(res.data.info); // 
	          }
	        }, (err) => {
	           this.$message.error('Oops, try again later！')

				})

      },
      resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    handleRemove(file, fileList) {
        console.log(file, fileList);
        this.pic='';
    },
    handlePreview(file) {
        console.log(file);
    },
		handleSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res.data.pictureUrl);
        this.pic=res.data.pictureUrl
        console.log(this.pic);
    },
    getProject(obj){ 
        this.$http.post('/api/project/getProjects', obj) // get project info
          .then((res) => {
            if(res.data == []){
              this.$router.push('/projectview')
            }
            console.log(res.data);
            this.project=res.data
            this.releasedays=new Date(res.data[0].postime)

            this.$http.post('/api/user/info', {uid: res.data[0].pownid}) // get ownername using pownid
            .then((res) => {
              console.log(res.data);


              this.ownerinfo=res.data     
              }, (err) => {
                  this.$message.error('Oops, try again later！')

            })  

            }, (err) => {
                this.$message.error('Oops, try again later！')

        })
      }
  },

  components: {
  	NavBar,
  	SideBar
  }
}
</script>


<style lang="stylus" scoped>
.postframe{
	margin-top:5%
	margin-left:20%
	margin-right:20%

	.panel-heading{
		text-align:left
	}
}
</style>
