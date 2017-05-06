const db = require('../config/db.js'), 
      messageModel = '../schema/Messages.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Message = testDb.import(messageModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserMessage = async function(uid) {
	const userMessages = await Message.findAll({
		where : {
			uid: uid
		}
	});
	return userMessages
}

const getUserReceivedMessage = async function(uid) {
	const userMessages = await Message.findAll({
		where : {
			toid: uid
		}
	});
	return userMessages	
}

const insertMessage = async function(data) {
	await Message.create({
		uid: data.uid,
		toid: data.toid,
		mcontent: data.mcontent
	});
}


module.exports = {
	getUserSentMessage,
	getUserReceivedMessage,
	insertMessage
}
