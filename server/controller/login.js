// controllers/user.js 

const user = require('../models/customer.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*const getUserInfo = async function(ctx) {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await user.getUserById(id);  // 通过yield “同步”地返回查询结果
  console.log(result);
  ctx.body = result // 将请求的结果放到response的body里返回
}*/

const signUp = async function(ctx) {
  const data = ctx.request.body;
  try {
    await user.createNewUser(data);
  } catch(error) {
    ctx.body = {
      success: false,
      info: error.errors[0].message
    };
    console.log(error.errors[0].message);
    return;
  }
  ctx.body = {
    success: true,
     info: 'Sign up seccessfully'
  };
  console.log(data.uname + 'Sign up seccessfully');
}

const postUserAuth = async function(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.uname);
  console.log(ctx.request)
  if(userInfo != null){ // 如果查无此用户会返回null
    if(data.upassword != userInfo.upassword){
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: 'Wrong password!'
      }
    }else{
      const userToken = {
        name: userInfo.uname,
        id: userInfo.uid
      }
      const secret = 'vue-koa-demo'; // 指定密钥
      const token = jwt.sign(userToken,secret); // 签发token
      ctx.body = {
        success: true,
        token: token,
        name: userInfo.uname, // 返回token
      }

    }
  }else{
    ctx.body = {
      success: false,
      info: "Account doesn't exist!" // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = {
  auth: (router) => {
    //router.get('/user/:id', getUserInfo); // 定义url的参数是id
    router.post('/login', postUserAuth);
    router.post('/login/reg', signUp);
  }
}