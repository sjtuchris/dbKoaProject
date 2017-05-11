const comment = require('../models/comment.js');
const customer = require('../models/customer.js');

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
 let dic = {}
 //if (data.pid) {
  let temp = []
  for (let i = 0; i < result.length; i++) {
   temp[i] = result[i].uid;
  }
  const users = await customer.getUserInList({userArray: temp});
  if (users) {
   for (let i = 0; i < users.length; i++) {
    dic[users[i].uid] = {
     uname: users[i].uname,
     upic: users[i].upic
    };
   }
  }
 //}
 ctx.body = {comment: result, dict: dic};
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

const getPidComment = async function(ctx) {
	const data = ctx.request.body;
	const result = await comment.getPidComment(data);
	console.log(result);
	const users = await customer.getUserById(data)

	ctx.body = {
		comment: result,
		users: users
	};
}
module.exports = (router) => {
  router.post('/comment/create', createComment);
  router.post('/comment/change', changeComment);
  router.post('/comment/delete', deleteComment);
  router.post('/comment/get', getComment);
  router.post('/comment/getpid', getPidComment);

}