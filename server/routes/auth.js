<<<<<<< HEAD
const login = require('../controller/login.js'); 
const router = require('koa-router')();

login.auth(router); // 用user的auth方法引入router
=======
const user = require('../controller/customer.js'); 
const router = require('koa-router')();

user.auth(router); // 用user的auth方法引入router
>>>>>>> 4ca901f0c2c170a8deda120cec1f0dbd946cccba

module.exports = router; // 把router规则暴露出去