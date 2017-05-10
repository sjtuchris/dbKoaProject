// server/routes/api.js

const user = require('../controller/user.js');
const message = require('../controller/message.js');
const project = require('../controller/project.js');
const upload = require('../controller/upload.js');
const rate = require('../controller/rate.js');
const tag = require('../controller/tag.js');
const like = require('../controller/like.js');
const follow = require('../controller/follow.js');
const money = require('../controller/money.js');
const card = require('../controller/card.js');
const record = require('../controller/record.js');
const log = require('../controller/log.js');
const comment = require('../controller/comment.js');
const ptype = require('../controller/projectType.js');
const router = require('koa-router')();

user(router); // 引入koa-router
message(router);
project(router);
upload(router);
rate(router);
tag(router);
ptype(router);
like(router);
follow(router);
money(router);
card(router);
record(router);
comment(router);
log(router);

module.exports = router; // 导出router规则