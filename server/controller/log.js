const log = require('../models/log.js');

const createLog = async function(ctx) {
	const data = ctx.request.body;
	try {
		await log.insertLog(data);
		console.log(data);
		ctx.body = {
			success:true,
			info: 'Create log successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const logList = async function(ctx) {
	const data = ctx.request.body;
	const lists = await log.getLog(data);
	console.log(lists);
	ctx.body = lists;
}

module.exports = (router) => {
  router.post('/log/create', createLog);
  router.post('/log/list', logList);
}

