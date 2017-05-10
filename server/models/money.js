const db = require('../config/db.js'), 
      moneyModel = '../schema/Money.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Money = testDb.import(moneyModel);

const insertMoney = async function(data) {
	await Money.create({
		uid: data.uid,
		cnum: data.cnum,
		pid: data.pid,
		mamount: data.mamount
	});
}

const moneyList = async function(data) {
	const result = await Money.findAll({
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
			mamount: data.mamount ? data.mamount : {
				'$between': [data.lowerMamount ? data.lowerMamount : 0, data.upperMamount ? data.upperMamount : Number.MAX_VALUE]
			},
			motime: data.motime ? data.motime : {
				'$between': [new Date(data.fromMotime ? data.fromMotime : '2010-01-01'), new Date(data.toMotime ? data.toMotime : '2200-01-01')]
			}
		}
	});
	return result;
}

module.exports = {
	insertMoney,
	moneyList
}