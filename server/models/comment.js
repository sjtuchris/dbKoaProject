const db = require('../config/db.js'), 
      commentModel = '../schema/Comments.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Comments = testDb.import(commentModel);

const insertComment = async function(data) {
	await Comments.create({
		uid: data.uid,
		pid: data.pid,
		ccontent: data.ccontent
	});
}

const deleteComment = async function(data) {
	await Comments.destroy({
		where: {
			uid: data.uid,
			pid: data.pid,
			ctime: data.ctime
		}
	});
}

const changeComment = async function(data) {
	await Comments.update( {
		ccontent: data.ccontent
	},{
		where: {
			uid: data.uid,
			pid: data.pid,
			ctime: data.ctime
		}
	});
}

const getComment = async function(data) {
	const result = await Comments.findAll({
		uid: data.uid ? data.uid : {
			'$between': [0, Number.MAX_VALUE]
		},
		pid: data.pid ? data.pid : {
			'$between': [0, Number.MAX_VALUE]
		},
		ccontent: {'$like': '%' + data.ccontent + '%'},
		ctime: data.ctime ? data.ctime : {
			'$between': [new Date(data.fromCtime ? data.fromCtime : '2010-01-01'), ]
		}
	});
	return result;
}

module.exports = {
	insertComment,
	deleteComment,
	changeComment,
	getComment
}