const follow = require('../models/follow.js');
const customer = require('../models/customer.js');

const followSomeone = async function(ctx) {
	const data = ctx.request.body;
	try {
		await follow.insertFollow(data);
		console.log(data.uid + ' follows ' + data.followid);
		ctx.body = {
			success: true,
			info: 'Follow successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const cancelFollow = async function(ctx) {
	const data = ctx.request.body;
	try {
		await follow.deleteFollow(data);
		console.log('Follow is cancelled successfully')
		ctx.body = {
			success: true,
			info: 'Follow is cancelled successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const getFollowList = async function(ctx) {
	const data = ctx.request.body;
	const lists = await follow.getFollowList(data);
	let temp = [];
	if (data.uid) {
		for (let i = 0; i < lists.length; i++) {
			temp[i] = lists[i].followid;
		}
	} else if (data.followid) {
		for (let i = 0; i < lists.length; i++) {
			temp[i] = lists[i].uid;
		}
	}
	const users = await customer.getUserInList({userArray: temp});
	ctx.body = {
		tuples: lists,
		users: users
	};
	console.log(lists);
}

module.exports = (router) => {
  router.post('/follow/follow', followSomeone);
  router.post('/follow/cancelFollow', cancelFollow);
  router.post('/follow/followList', getFollowList);
}