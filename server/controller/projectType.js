const types = require('../models/projectType.js');

const giveProjectType = async function(ctx) {
	const data = ctx.request.body;
	try {
		await types.insertProjectType(data);
		console.log('Give ' + data.pid + ' ' + data.tname);
		ctx.body = {
			success: true,
			info: 'Give project this tag successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const getProjectTypes = async function(ctx) {
	const data = ctx.request.body;
	const tags = await types.getProjectType(data);
	console.log(tags);
	ctx.body = tags;
}

module.exports = (router) => {
  router.post('/projectType/giveType', giveProjectType);
  router.post('/projectType/getType', getProjectTypes);
}