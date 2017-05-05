<<<<<<< HEAD
// server/routes/api.js

const user = require('../controller/user.js');
const router = require('koa-router')();

user(router); // 引入koa-router

module.exports = router; // 导出router规则
=======
const todolist = require('../controller/todolist.js');
const router = require('koa-router')();

todolist(router);

module.exports = router;
>>>>>>> 4ca901f0c2c170a8deda120cec1f0dbd946cccba
