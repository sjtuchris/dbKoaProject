// server/routes/api.js

const user = require('../controller/user.js');
const router = require('koa-router')();

user(router); // 引入koa-router

module.exports = router; // 导出router规则