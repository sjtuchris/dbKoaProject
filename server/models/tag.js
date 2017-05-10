const db = require('../config/db.js'), 
      tagsModel = '../schema/Tags.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Tags = testDb.import(tagsModel);

const insertTag = async function(data) {
	await Tags.create({
		tname: data.tname,
		tdescription: data.tdescription
	});
}

const getCertainTag = async function(data) {
	const result = await Tags.findAll({
		where: {
			'$or': [
				{tname: data.tname ? data.tname : {
					'$like': data.keyword ? '%' + data.keyword + '%' : '%'
				}},
				{tdescription: data.tdescription ? data.tdescription : {
					'$like': data.keyword ? '%' + data.keyword + '%' : '%'
				}}
			]
		}
	});
	return result;
}

module.exports = {
	insertTag,
	getCertainTag
}