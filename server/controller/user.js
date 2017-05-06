const user = require('../models/customer.js');
const message = require('../models/message.js');

const getUserInfo = async function(ctx) {
	const uname = ctx.request.body.uname; // 获取url里传过来的参数里的id
	const result = await user.getUserByName(uname);  // 通过yield “同步”地返回查询结果
	console.log(result);
	ctx.body = result // 将请求的结果放到response的body里返回
}

const modifyUserInfo = async function(ctx) {
	const data = ctx.request.body;
	const uname = data.thisname;
  delete data.thisname;
	try {
		await user.updateUserInfo(uname,data);
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
    info: 'Update seccessfully'
  };
}

const userAllSentMessage = async function(ctx) {
  const uid = ctx.request.body.uid;
  const messages = await message.getUserSentMessage(uid);
  console.log(messages);
  ctx.body = messages;
}

const userAllReceivedMessage = async function(ctx) {
  const uid = ctx.request.body.uid;
  const messages = await message.getUserReceivedMessage(uid);
  console.log(messages);
  ctx.body = messages;
}

const sendMessage = async function(ctx) {
  const data = ctx.request.body;
  try{
    if (data.uid == data.toid) {
      ctx.body = {
        success: false,
        info: 'Could not send message to yourself'
      };
      console.log(data.uid + ': Could not send message to yourself');
      return;
    }
    await message.insertMessage(data);
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
    info: 'Message: ' + data.mcontent
  };
}

module.exports = (router) => {
  router.post('/user/info', getUserInfo),
  router.post('/user/update', modifyUserInfo),
  router.post('/user/sentMessages', userAllSentMessage),
  router.post('/user/receivedMessages', userAllReceivedMessage),
  router.post('/user/sendMessage', sendMessage)
};
