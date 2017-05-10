const like = require('../models/like.js');

const giveLike = async function(ctx) {
	const data = ctx.request.body;
	try {
		await like.insertLike(data);
		console.log(data.uid + ' ' + data.like + ' ' + data.pid);
		ctx.body = {
			success: true,
			info: like == 'y' ? 'You give a like to this project' : 'You give a dislike to this project'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.errors[0].message
		};
		console.log(error.errors[0].message);
	}
}

const cancelLike = async function(ctx) {
	const data = ctx.request.body;
	try {
		await like.deleteLike(data);
		console.log(data.uid + ' cancel like from ' + data.pid)
		ctx.body = {
			success: true,
			info: 'Cancel successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const totalLike = async function(ctx) {
	const data = ctx.request.body;
	const up = await like.getLike(data, 'y');
	const down = await like.getLike(data, 'n');
	ctx.body = {
		like: up.length,
		dislike: down.length
	}
}

const isLike = async function(ctx) {
	const data = ctx.request.body;
	const result = await like.getLike(data, 'y');
	ctx.body = {
		'isLike': (result.length > 0 ? true : false)
	};
}

module.exports = (router) => {
  router.post('/like/giveLike', giveLike);
  router.post('/like/cancelLike', cancelLike);
  router.post('/like/totalLike', totalLike);
  router.post('/like/isLike', isLike);
}