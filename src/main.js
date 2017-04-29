import Vue from 'vue'
import VueRouter from './router/index'
import App from './App'
import ElementUI from 'element-ui' // 引入element-ui, 前端框架
import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI) // Vue全局使用

const router = VueRouter

var app = new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})

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