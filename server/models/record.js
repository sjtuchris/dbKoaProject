const db = require('../config/db.js'), 
      recordModel = '../schema/Records.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Records = testDb.import(recordModel);

const getCertainRecord = async function(data) {
	const result = await Records.findAll({
		where: {
			uid: data.uid ? data.uid : {
				'$between': [0, Number.MAX_VALUE]
			},
			cnum: data.cnum ? data.cnum : {
				'$between': [0, Number.MAX_VALUE]
			},
			pid: data.pid ? data.pid : {
				'$between': [0, Number.MAX_VALUE]
			},
			ramount: data.ramount ? data.ramount : {
				'$between': [data.lowerRamount ? data.lowerRamount : 0, data.upperRamount ? data.upperRamount : Number.MAX_VALUE]
			},
			retime: data.retime ? data.retime : {
				'$between': [new Date(data.fromtRetime ? data.fromRetime : '2010-01-01'), new Date(data.toRetime ? data.toRetime : '2200-01-01')]
			}
		}
	});
	return result;
}

module.exports = {
	getCertainRecord
}