const card = require('../models/card.js');

const addCard = async function(ctx) {
	const data = ctx.request.body;
	try {
		await card.insertCard(data);
		console.log(data.uid + ' add new card: ' + data.cnum);
		ctx.body = {
			success: true,
			info: 'Add card successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const deleteCard = async function(ctx) {
	const data = ctx.request.body;
	try {
		await card.deleteCard(data);
		console.log(data.cnum + ' is deleted by ' + data.uid);
		ctx.body = {
			success: true,
			info: 'Delete card successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.message);
	}
}

const cardList = async function(ctx) {
	const data = ctx.request.body;
	const lists = await card.cardList(data);
	ctx.body = lists;
	console.log(lists);
}

const updateCard = async function(ctx) {
	const data = ctx.request.body;
	let thisCnum = data.thisCnum;
	let thisUid = data.thisUid;
	delete data.thisCnum;
	delete data.thisUid;
	try{
		await card.updateCard(data, thisCnum, thisUid);
		console.log('Update card successfully');
		ctx.body = {
			success: true,
			info: 'Update card successfully'
		};
	} catch(error) {
		console.log(error.message);
		ctx.body = {
			success: false,
			info: error.message
		};
	}
}

module.exports = (router) => {
  router.post('/card/addCard', addCard);
  router.post('/card/cardList', cardList);
  router.post('/card/deleteCard', deleteCard);
  router.post('/card/updateCard', updateCard);
}