<template>



	<el-row class="content">

		<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-row :gutter="20">
				<el-col :xs="4" :sm="4" :md="4" :lg="4">
					<el-menu-item index="1">ProjectX</el-menu-item>
				</el-col>
				<el-col :xs="4" :sm="4" :md="4" :lg="4">
					<el-submenu index="2">
						<template slot="title">Toggle</template>
						<el-menu-item index="2-1">1</el-menu-item>
						<el-menu-item index="2-2">2</el-menu-item>
						<el-menu-item index="2-3">3</el-menu-item>
					</el-submenu>
				</el-col>
				<el-col :xs="6" :sm="4" :md="12" :lg="12">
					<el-menu-item index="3"><router-link to="/login">Manage</router-link></el-menu-item>
				</el-col>
				<el-col :xs="6" :sm="6" :md="12" :lg="12">
					<el-menu-item index="3">
						<el-input
						  placeholder="Search..."
						  icon="search"
						  v-model="input2"
						  :on-icon-click="handleIconClick">
						</el-input>
					</el-menu-item>
				</el-col>
				<el-col :xs="4" :sm="2" :md="2" :lg="2">
					<el-menu-item index="4">
						<img class="img-circle" src="../assets/avatar.png" width="70px" height="50px" alt="logo">
					</el-menu-item>
				</el-col>
				<el-col :xs="4" :sm="4" :md="2" :lg="2">
					<el-menu-item index="5">{{name}}</el-menu-item>
				</el-col>
				<!-- <el-col :span="16"></el-col>
				<el-col :span="16"></el-col>
				<el-col :span="16"></el-col> -->
				
				
				
			</el-row>
		</el-menu>

		<el-col :xs="{span:20,offset:20}" :sm="{span:8,offset:8}">
			<span>
				Welcome：{{name}}!
			</span>
			<el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
			<el-tabs v-model="activeName">
				<el-tab-pane label="待办事项" name="first">
					<el-col :xs="24">
						<template v-if="!Done"> 
							<template v-for="(item, index) in list">
								<div class="todo-list" v-if="item.status == false">
									<span class="item">
										{{ index + 1 }}. {{ item.content }}
									</span>
									<span class="pull-right">
										<el-button size="small" type="primary" @click="finished(index)">完成</el-button>
										<el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
									</span>
								</div>
							</template> 
						</template>
						<div v-else-if="Done">
							暂无待办事项
						</div>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="已完成事项" name="second">
					<template v-if="count > 0">
						<template v-for="(item, index) in list">
							<div class="todo-list" v-if="item.status == true">
								<span class="item finished">
									{{ index + 1 }}. {{ item.content }}
								</span>
								<span class="pull-right">
									<el-button size="small" type="primary" @click="restore(index)">还原</el-button>
								</span>
							</div>
						</template> 
					</template>
					<div v-else>
						暂无已完成事项
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>
</template>

<script>
// import jwt from 'jsonwebtoken'

export default {
	created(){ // 组件创建时调用
		const userInfo = this.getUserInfo(); // 新增一个获取用户信息的方法
		if(userInfo != null){
			this.id = userInfo.id;

			this.name = userInfo.name;
		}else{
			this.id = '';
			this.name = ''
		}
	},
	data () {
		return {
			name: '', // 用户名改为空
			todos: '',
			activeName: 'first',
			list:[],
			count: 0,
			id: '', // 新增用户id属性，用于区别用户
			activeIndex: '1',
			activeIndex2: '1',
			input2: ''
		};
	},
	computed: { // 计算属性用于计算是否已经完成了所有任务
		Done(){
			let count = 0;
			let length = this.list.length;
			for(let i in this.list){
				this.list[i].status == true ? count += 1 : '';
			}
			this.count = count;
			if(count == length || length == 0){
				return true
			}else{
				return false
			}
		}
	},

	methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			addTodos() {
				if(this.todos == '')
					return
				let obj = {
					content: this.todos,
					id: this.id
				}
				this.$http.post('/api/todolist', obj)
					.then((res) => {
						if(res.status == 200){
							this.$message({
								type: 'success',
								message: '创建成功！'
							})
							this.getTodolist();
						}else{
							this.$message.error('创建失败！')
						}
					}, (err) => {
						this.$message.error('创建失败！')
						console.log(err)
					})
				this.todos = '';
			},
			update(index) {
				this.$http.put('/api/todolist/'+ this.id + '/' + this.list[index].id + '/' + this.list[index].status)
					.then((res) => {
						if(res.status == 200){
							this.$message({
								type: 'success',
								message: '任务状态更新成功！'
							})
							this.getTodolist();
						}else{
							this.$message.error('任务状态更新失败！')
						}
					}, (err) => {
						this.$message.error('任务状态更新失败！')
						console.log(err)
					})
			},
			remove(index) {
				this.$http.delete('/api/todolist/'+ this.id + '/' + this.list[index].id)
					.then((res) => {
						if(res.status == 200){
							this.$message({
								type: 'success',
								message: '任务删除成功！'
							})
							this.getTodolist();
						}else{
							this.$message.error('任务删除失败！')
						}
					}, (err) => {
						this.$message.error('任务删除失败！')
						console.log(err)
					})
			},
			getUserInfo(){ // 获取用户信息
				const name = sessionStorage.getItem('name');
				const id = sessionStorage.getItem('id');

				if(name != null && name != 'null'){
					// let decode = jwt.verify(token,'vue-koa-demo'); // 解析token
					return {name: name,id: id} // decode解析出来实际上就是{name: XXX,id: XXX}
				}else {
					return null
				}
			},
			handleIconClick(ev) {
      console.log(ev);
    	}
		}
};
</script>

<style lang="stylus" scoped>
	.el-input
		margin 20px auto
	.todo-list
		width 100%
		margin-top 20px
		padding-bottom 8px
		border-bottom 1px solid #eee
		overflow hidden
		text-align left
		.item
			font-size 20px
			&.finished
				text-decoration line-through
				color #ddd
	.pull-right
		float right
	.img-circle {  
    -moz-border-radius: 50%;  
    -webkit-border-radius: 50%;  
    border-radius: 50%;  
	}  
  
	.img-circle:hover {  
    -moz-box-shadow: 0px 0px 25px rgba(0, 255, 178, 1);  
    -webkit-box-shadow: 0px 0px 25px rgba(0, 255, 178, 1);  
    box-shadow: 0px 0px 25px rgba(0, 255, 178, 1);  
    cursor: pointer;  
	} 
  .el-col {
    border-radius: 4px;
  }
</style>