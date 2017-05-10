const db = require('../config/db.js'), 
      logModel = '../schema/Log.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Log = testDb.import(logModel);

const insertLog = async function(data) {
	await Log.create({
		uid: data.uid,
		lcontent: data.lcontent,
		ltype: data.ltype
	});
}

const getLog = async function(data) {
	const result = await Log.findAll({
		where: {
			uid: data.uid ? data.uid : {
				'$between': [0, Number.MAX_VALUE]
			},
			lcontent: {'$like': data.lcontent ? '%' + data.lcontent + '%' : '%'},
			ltype: {'$like': data.ltype ? data.ltype : '%'},
			ltime: data.ltime ? data.ltime : {
				'$between': [new Date(data.fromLtime ? data.fromLtime : '2010-01-01'), new Date(data.toLtime ? data.toLtime : '2200-01-01')]
			}
		}
	});
	return result;
}

module.exports = {
	insertLog,
	getLog
}