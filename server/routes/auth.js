const login = require('../controller/login.js'); 
const router = require('koa-router')();

login.auth(router); // 用user的auth方法引入router

module.exports = router; // 把router规则暴露出去