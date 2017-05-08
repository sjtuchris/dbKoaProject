const db = require('../config/db.js'), 
      messageModel = '../schema/Messages.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Message = testDb.import(messageModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserSentMessage = async function(data) {
	const userMessages = await Message.findAll({
		where : {
			uid: data.uid,
			mtime: {
				'$gte': new Date(data.fromDate ? data.fromDate : "2000-01-01 00:00:00"),
				'$lte': new Date(data.toDate ? data.toDate : "2200-01-01 00:00:00")
			}
		}
	});
	return userMessages
}

const getUserReceivedMessage = async function(data) {
	const userMessages = await Message.findAll({
		where : {
			toid: data.toid,
			mtime: {
				'$gte': new Date(data.fromDate ? data.fromDate : "2000-01-01 00:00:00"),
				'$lte': new Date(data.toDate ? data.toDate : "2200-01-01 00:00:00")
			}
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

const deleteMessage = async function(data) {
	await Message.destroy({
		where: {
			uid: data.uid,
			mtime: new Date(data.mtime)
		}
	});
}

module.exports = {
	getUserSentMessage,
	getUserReceivedMessage,
	insertMessage,
	deleteMessage
}