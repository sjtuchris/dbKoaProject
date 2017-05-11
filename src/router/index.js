import Vue            from 'vue'
import VueRouter      from 'vue-router'
import Hello          from '../components/Hello'
import Login          from '../components/Login'
import TodoList       from '../components/TodoList'
import test           from '../components/test'
import Register       from '../components/Register'
import Userfile       from '../components/Userfile'
import UserSpace      from '../components/UserSpace'
import ProjectView    from '../components/ProjectView'
import ProjectDetail  from '../components/ProjectDetail'
import PostProject    from '../components/PostProject'
import ModifyProject  from '../components/ModifyProject'
import FriendZone     from '../components/FriendZone'
import Pledge         from '../components/Pledge'

Vue.use(VueRouter)

export default new VueRouter({
  // mode: 'history',
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
      path: '/UserSpace/:uname',
      component: UserSpace
    },{
      path: '/ProjectView',
      component: ProjectView
    },{
      path: '/ProjectView/:keyword',
      component: ProjectView
    },{
      path: '/ProjectDetail/:pid',
      component: ProjectDetail      
    },{
      path: '/PostProject',
      component: PostProject      
    },{
      path: '/ModifyProject/:pid',
      component: ModifyProject      
    },{
      path: '/FriendZone',
      component: FriendZone      
    },{
      path: '/Pledge/:pid',
      component: Pledge      
    },{
    	path: '*',
      	redirect: '/' 
    }
  ]
})
