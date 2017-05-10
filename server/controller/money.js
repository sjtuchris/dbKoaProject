const money = require('../models/money.js');

const giveMoney = async function(ctx) {
	const data = ctx.request.body;
	try {
		await money.insertMoney(data);
		console.log(data.uid + ' give ' + data.mamount + ' to ' + data.pid);
		ctx.body = {
			success: true,
			info: 'Give money successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const moneyList = async function(ctx) {
	const data = ctx.request.body;
	const lists = await money.moneyList(data);
	let total = 0;
	if (data.needSum) {
		for (let i = 0; i < lists.length; i ++) {
			total += lists[i].mamount
		}
	}
	ctx.body = {
		sum: data.needSum ? total : null,
		content: lists
	};
	console.log(lists);
}

module.exports = (router) => {
  router.post('/money/giveMoney', giveMoney);
  router.post('/money/moneyList', moneyList);
}