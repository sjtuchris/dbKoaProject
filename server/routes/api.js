// server/routes/api.js

const user = require('../controller/user.js');
const message = require('../controller/message.js');
const project = require('../controller/project.js');
const upload = require('../controller/upload.js');
const router = require('koa-router')();

user(router); // 引入koa-router
message(router)
project(router)
upload(router)

module.exports = router; // 导出router规则