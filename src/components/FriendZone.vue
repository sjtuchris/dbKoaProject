<template>

	<div>
  	
    <nav-bar></nav-bar>

		<div class="container bootstrap snippet">

		  <div class="header">
		    <h3 class="text-muted prj-name">
		        <span class="fa fa-users fa-2x principal-title"></span>
		        Friend zone
		    </h3>
		  </div>
		  <div class="jumbotron list-content">
		    <ul class="list-group">
		      <li href="#" class="list-group-item title">
		        Your friend zone
		      </li>

		      <li href="#" class="list-group-item text-left" v-for="(o,index) in friendlist.users" :key="o">
		        <img class="img-thumbnail" :src="o.upic">
		        <label class="name">
		            {{o.uname}}<br>
		        </label>
		        <label class="pull-right">
		            <a  class="btn btn-success btn-xs glyphicon glyphicon-ok" href="#" disabled title="View"></a>
		            <div  class="btn btn-danger  btn-xs glyphicon glyphicon-trash" @click="unfollow(o.followid)" title="Delete"></div>
		            <a  class="btn btn-info  btn-xs glyphicon glyphicon glyphicon-comment" href="#" title="Send message"></a>
		        </label>
		        <div class="break"></div>
		      </li>
		    
		      
		    </ul>
		  </div>
		  </div>
		</div>                                                                                
  </div>
</template>

<script>
	import NavBar        from '../common/nav-bar'

	export default{
		name: 'friendzone',
		created(){
			this.getFollow();
		},
		data(){
			return{
				friendlist:[],
				name:[]
			}
		},
		methods: {
			getFollow(){
				this.$http.post('/api/follow/followlist', {uid: localStorage.getItem('id')}) // get ownername using pownid
	            .then((res) => {
	              // console.log(res.data);
	              this.friendlist=res.data              
	            }, (err) => {
	              this.$message.error('Oops, try again later！')

	            })
			},
			unfollow(followid){
				this.$http.post('/api/follow/cancelFollow',{uid: localStorage.getItem('id'),followid:followid})
				.then((res) => {
	              // console.log(res.data);
	              this.$router.go('/friendzone')
	            }, (err) => {
	              this.$message.error('Oops, try again later！')

	            })
			}
			
		},
		components: {
			NavBar
		}
	}
</script>

<style lang="stylus" scoped>
.container{
	margin-top:3%
}
.list-content{
 min-height:300px;
}
.list-content .list-group .title{
  background:#5bc0de;
  border:2px solid #DDDDDD;
  font-weight:bold;
  color:#FFFFFF;
}
.list-group-item img {
    height:80px; 
    width:80px;
}

.jumbotron .btn {
    padding: 5px 5px !important;
    font-size: 12px !important;
}
.prj-name {
    color:#5bc0de;    
}
.break{
    width:100%;
    margin:20px;
}
.name {
    color:#5bc0de;    
}
</style>