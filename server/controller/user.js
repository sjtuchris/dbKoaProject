const user = require('../models/customer.js');

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

module.exports = (router) => {
	router.post('/user/info', getUserInfo),
	router.post('/user/update', modifyUserInfo)
};