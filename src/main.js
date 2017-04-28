import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui' // 引入element-ui, 前端框架
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI) // Vue全局使用

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})