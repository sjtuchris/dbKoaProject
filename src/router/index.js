import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Hello'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
  	{
  		path: '/',
  		component: Hello
  	},{
      	path: '/Hello',
      	component: Hello
    },{
    	path: '/Login',
    	component: Login
    },{
    	path: '/TodoList',
    	component: TodoList
    }
  ]
})
