const db = require('../config/db.js'), 
      projectTypeModel = '../schema/Project_type.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const projectType = testDb.import(projectTypeModel);

const insertProjectType = async function(data) {
	await projectType.create({
		tname: data.tname,
		pid: data.pid
	});
}

const getProjectType = async function(data) {
	const result = projectType.findAll({
		where: {
			pid: data.pid ? data.pid : {
				'$between': [0, Number.MAX_VALUE]
			},
			tname: data.tname ? data.tname : {
				'$like': data.keyword? '%' + data.keyword + '%' : '%'
			}
		}
	});
	return result;
}

module.exports = {
	insertProjectType,
	getProjectType
}