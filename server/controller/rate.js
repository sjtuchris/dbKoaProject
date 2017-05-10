const rate = require('../models/rate.js');

const giveRate = async function(ctx) {
	const data = ctx.request.body;
	try {
		await rate.insertRate(data);
		console.log(data.uid + ' rates ' + data.pid + ': ' + data.rpoint);
		ctx.body = {
			success: true,
			info:'Give rate successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.name);
	}
}

const getCertainRate = async function(ctx) {
	const data = ctx.request.body;
	const rates = await rate.getCertainRate(data);
	let sum = 0;
	if (data.needAverage) {
		for (let i = 0; i < rates.length; i++) {
			sum += rates[i].rpoint;
		}
	}
	ctx.body = {
		average: data.needAverage ? sum / rates.length : null,
		content: rates
	};
	console.log(rates);
}

module.exports = (router) => {
  router.post('/rate/giveRate', giveRate);
  router.post('/rate/getRate', getCertainRate);
}