const db = require('../config/db.js'), 
      likeModel = '../schema/Like.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Like = testDb.import(likeModel);

const insertLike = async function(data) {
	await Like.create({
		uid: data.uid,
		pid: data.pid,
		like_dislike: data.like_dislike
	});
}

const getLike = async function(data, likeOrDislike) {
	const result = await Like.findAll({
		where: {
			uid: data.uid ? data.uid : {
				'$between': [0, Number.MAX_VALUE]
			},
			pid: data.pid ? data.pid : {
				'$between': [0, Number.MAX_VALUE]
			},
			like_dislike: likeOrDislike ? likeOrDislike : {
				'$like' : '%'
			}
		}
	});
	return result;
}
const deleteLike = async function(data) {
	await Like.destroy({
		where: {
			uid: data.uid,
			pid: data.pid
		}
	});
}

module.exports = {
	getLike,
	insertLike,
	deleteLike
}