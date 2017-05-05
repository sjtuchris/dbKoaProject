import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Hello'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

Vue.use(VueRouter)

export default new VueRouter({
	mode: 'history',
	//base:_dirname,
  routes: [
  	{
  		path: '/',
  		component: Login
  	},{
      	path: '/Hello',
      	component: Hello
    },{
    	path: '/Login',
    	component: Login
    },{
    	path: '/TodoList',
    	component: TodoList
    },{
    	path: '*',
      	redirect: '/' 
    }
  ]
})
