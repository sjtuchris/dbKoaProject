const db = require('../config/db.js'), 
      messageModel = '../schema/Messages.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Message = testDb.import(messageModel); // 用sequelize的import方法引入表结构，实例化了User。

<<<<<<< HEAD
const getUserSentMessage = async function(uid) {
=======
const getUserMessage = async function(uid) {
>>>>>>> 95f4afb036e7fdab72f89e91f1b5949aba90fa46
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
