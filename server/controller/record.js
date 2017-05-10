const record = require('../models/record.js');

const recordList = async function(ctx) {
	const data = ctx.request.body;
	const lists = await record.getCertainRecord(data);
	console.log(lists);
	ctx.body = lists;
}

module.exports = (router) => {
  router.post('/record/recordList', recordList);
}