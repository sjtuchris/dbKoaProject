// controllers/user.js 

const user = require('../models/customer.js');

const getUserInfo = async function(ctx){
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await user.getUserById(id);  // 通过yield “同步”地返回查询结果
  console.log(result);
  ctx.body = result // 将请求的结果放到response的body里返回
}

module.exports = {
  auth: (router) => {
    router.get('/user/:id', getUserInfo); // 定义url的参数是id
  }
}