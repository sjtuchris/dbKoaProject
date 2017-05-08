import Vue          from 'vue'
import VueRouter    from 'vue-router'
import Hello        from '../components/Hello'
import Login        from '../components/Login'
import TodoList     from '../components/TodoList'
import test         from '../components/test'
import Register     from '../components/Register'
import Userfile     from '../components/Userfile'
import ProjectView  from '../components/ProjectView'
import ProjectDetail from '../components/ProjectDetail'
import PostProject from '../components/PostProject'


Vue.use(VueRouter)

export default new VueRouter({
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
      path: '/test',
      component: test
    },{
      path: '/Register',
      component: Register
    },{
      path: '/Userfile',
      component: Userfile
    },{
      path: '/ProjectView',
      component: ProjectView
    },{
      path: '/ProjectDetail',
      component: ProjectDetail      
    },{
      path: '/PostProject',
      component: PostProject      
    },{
    	path: '*',
      	redirect: '/' 
    }
  ]
})
