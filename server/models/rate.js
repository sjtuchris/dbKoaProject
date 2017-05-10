const db = require('../config/db.js'), 
      ratesModel = '../schema/Rates.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Rates = testDb.import(ratesModel);

const insertRate = async function(data) {
	await Rates.create({
		uid: data.uid,
		pid: data.pid,
		rpoint: data.rpoint
	});
}

const getCertainRate = async function(data) {
	const result = await Rates.findAll({
		where : {
			uid: data.uid ? data.uid : {
				'between': [data.lowerUid ? data.lowerUid : 0, data.lowerUid ? data.lowerUid : Number.MAX_VALUE]
			},
			pid: data.pid ? data.pid : {
				'between': [data.lowerPid ? data.lowerPid : 0, data.upperPid ? data.upperPid : Number.MAX_VALUE]
			},
			rpoint: data.rpoint ? data.rpoint : {
				'$gte': data.upperRpoint ? data.upperRpoint : 0,
				'$lte': data.lowerRpoint ? data.lowerRpoint : 5
			},
			ratime: data.ratime ? data.ratime : {
				'$between': [new Date(data.fromRatime ? data.fromRatime : "2010-01-01 00:00:00"), new Date(data.toRatime ? data.toRatime : "2200-01-01 00:00:00")]
			}
		}
	});
	return result;
}

module.exports = {
	insertRate,
	getCertainRate
}