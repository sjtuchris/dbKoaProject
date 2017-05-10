const tag = require('../models/tag.js');

const createTag = async function(ctx) {
	const data = ctx.request.body;
	try {
		await tag.insertTag(data);
		console.log('Create tag: ' + data.tname);
		ctx.body = {
			success: true,
			info: 'Create tag successfullly'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const getTags = async function(ctx) {
	const data = ctx.request.body;
	const tags = await tag.getCertainTag(data);
	console.log(tags);
	ctx.body = tags;
}

module.exports = (router) => {
  router.post('/tag/createTag', createTag);
  router.post('/tag/getTag', getTags);
}