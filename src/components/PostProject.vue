<template>
  <div>
    <nav-bar></nav-bar>

    <el-row class="postframe">

        <div class="panel-group">
          <div class="panel panel-primary">
            <div class="panel-heading">Panel Content</div>
            <div class="panel panel-default">
              <div class="panel-body">
              	
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="Name" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="Money Range" prop="max_amount">
				    <el-col :span="11">
				   		<el-input v-model="ruleForm.min_amount" placeholder="Minimum Amount" prop="min_amount"></el-input>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      	<el-input v-model="ruleForm.max_amount" placeholder="Maximum Amount" prop="max_amount"></el-input>

				    </el-col>
				  </el-form-item>
				  <el-form-item label="Deadline" required>
				    <el-col :span="11">
				      <el-form-item prop="date1">
				        <el-date-picker type="date" placeholder="Choose Date" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				      </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="11">
				      <el-form-item prop="date2">
				        <el-time-picker type="fixed-time" placeholder="Choose time" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
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
				    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">Post Now!</el-button>
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
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        pic: ''
      },
      rules: {
        name: [
          { required: true, message: 'Project Name required', trigger: 'blur' },
          { min: 3, max: 30, message: 'Length ranging from 3 to 30 words', trigger: 'blur' }
        ],
        min_amount: [
        	{ required: true, message: 'Minimum Amount required', trigger: 'blur'}
        ],
        max_amount: [
        	{ required: true, message: 'Minimum Amount required', trigger: 'blur'},
        	{ validator: validateMax, trigger:'blur'}
        ],
        date1: [
          { type: 'date', required: true, message: 'Choose date', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: 'Choose time', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: 'Choose one tag at least', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Selection required', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Description required', trigger: 'blur' }
        ],
        
      }
    };
  },
  methods: {
    submitForm(formName) {
    	console.log(this.pic)
      this.$refs[formName].validate((valid) => {
      if (valid) {

		    let obj = {
	        pname: this.ruleForm.name,
	        pdescription: this.ruleForm.desc,
	        pownid: sessionStorage.getItem('id'),
	        min_amount: this.ruleForm.min_amount,
	        max_amount: this.ruleForm.max_amount,
	        fund_endtime: this.ruleForm.date1,
	        ppic: this.pic,
	        pstatus: 'active'
	      }
	      console.log(obj)
				this.$http.post('/api/project/postProject', obj) // 将信息发送给后端
			        .then((res) => {
			          console.log(res);
				        if(res.data.success){ // 如果成功
				            
				            this.$message({ // 登录成功，显示提示语
				              type: 'success',
				              message: 'Posted successfully！'
				            });
				            alert('submit!');

				            this.$router.push('/projectview') 
								}else{
				            this.$message.error(res.data.info); // 
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

        // let urlobj = {
        //   "thisname": sessionStorage.getItem('name'),
        //   "upic": res.data.pictureUrl
        // }
        // this.$http.post('/api/user/update', urlobj)
        //   .then((res) => {
        //           console.log(res);
          
        //         })
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
