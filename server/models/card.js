const db = require('../config/db.js'), 
      cardsModel = '../schema/Cards.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Cards = testDb.import(cardsModel);

const insertCard = async function(data) {
	await Cards.create({
		cnum: data.cnum,
		uid: data.uid,
		exp_date: data.exp_date,
		holder: data.holder
	});
}

const cardList = async function(data) {
	const result = await Cards.findAll({
		where: {
			cnum: data.cnum ? data.cnum : {
				'$like': data.keywordCnum ? '%' + data.keywordCnum + '%' : '%',
				'$ne': -1
			},
			uid: data.uid ? data.uid : {
				'$between': [0, Number.MAX_VALUE]
			},
			exp_date: data.exp_date ? new new Date(data.exp_date) : {
				'$between': [new Date('2010-01-01 00:00:00'), new Date('2300-01-01 00:00:00')]
			},
			holder: data.holder ? data.holder : {
				'$like': data.keywordHolder ? '%' + data.keywordHolder + '%' : '%'
			}
		}
	});
	return result;
}

const deleteCard = async function(data) {
	await Cards.destroy({
		where: {
			uid: data.uid,
			cnum: data.cnum
		}
	});
}

const updateCard = async function(data, thisCnum, thisUid) {
	await Cards.update(data, {
		where: {
			uid: thisUid,
			cnum: thisCnum
		}
	});
}

module.exports = {
	deleteCard,
	insertCard,
	cardList,
	updateCard
}