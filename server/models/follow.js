const db = require('../config/db.js'), 
      followModel = '../schema/Follow.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Follow = testDb.import(followModel);

const insertFollow = async function(data) {
	await Follow.create({
		uid: data.uid,
		followid: data.followid
	});
}

const deleteFollow = async function(data) {
	await Follow.destroy({
		where: {
			uid: data.uid,
			followid: data.followid
		}
	});
}

const getFollowList = async function(data) {
	const result = await Follow.findAll({
		where: {
			uid: data.uid ? data.uid : {
				'$between': [0, Number.MAX_VALUE]
			},
			followid: data.followid ? data.followid : {
				'$between': [0, Number.MAX_VALUE]
			},
			fotime: data.fotime ? data.fotime : {
				'$between': [new Date(data.fromFotime ? data.fromFotime : '2010-01-01'), new Date(data.toFotime? data.toFotime : '2200-01-01')]
			}
		}
	});
	return result;
}

module.exports = {
	insertFollow,
	deleteFollow,
	getFollowList
}