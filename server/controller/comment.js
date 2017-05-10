const comment = require('../models/comment.js');

const createComment = async function(ctx) {
	const data = ctx.request.body;
	try {
		await comment.insertComment(data);
		console.log('Comment successfully');
		ctx.body = {
			success: true,
			info: 'Comment successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const changeComment = async function(ctx) {
	const data = ctx.request.body;
	await comment.changeComment(data);
	console.log('Change commit successfully');
	ctx.body = {
		success: true,
		info:'Change commit successfully'
	};
}

const getComment = async function(ctx) {
	const data = ctx.request.body;
	const result = await comment.getComment(data);
	console.log(result);
	ctx.body = result;
}

const deleteComment = async function(ctx) {
	const data = ctx.request.body;
	await comment.deleteComment(data);
	console.log('Delect comment successfully');
	ctx.body = {
		success: true,
		info:'Delect comment successfully'
	}
}

module.exports = (router) => {
  router.post('/comment/create', createComment);
  router.post('/comment/change', changeComment);
  router.post('/comment/delete', deleteComment);
  router.post('/comment/get', getComment);
}