import Vue from 'vue'
import VueRouter from './router/index'
import App from './App'
import ElementUI from 'element-ui' // 引入element-ui, 前端框架
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'

Vue.prototype.$http = Axios // 类似于vue-resource的调用方法

Vue.use(ElementUI) // Vue全局使用

const router = VueRouter

router.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/todolist') // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 注意Bearer后有个空格
      next() // 如果有token就正常转向
    }else{
      next('/') // 否则跳转回登录页
    }
  }
})

var app = new Vue({
  router: router,
  render: h => h(App) 
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router: router,
//   template: '<App/>',
//   components: { App }
// })

/* eslint-disable no-new */
// 这灵活得亮瞎了
// 666入口就这么定义吧，我也不太懂
/*new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
});

 new Vue(Vue.util.extend({
   router
 }, App)).$mount('#app');

new Vue({
  el:'#app',
  router,
  render:h => h(App)
});*/