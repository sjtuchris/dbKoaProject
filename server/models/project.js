const db = require('../config/db.js'), 
      projectModel = '../schema/Projects.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const Projects = testDb.import(projectModel); // 用sequelize的import方法引入表结构，实例化了User。

const getProjects = async function(data) {
	const certainProjects = await Projects.findAll({
		where: {
			pid: data.pid ? data.pid : {
				'$between': [data.lowerId ? data.lowerId : 0, data.upperId ? data.upperId : Number.MAX_VALUE] 
			},
			pownid: data.pownid ? data.pownid : {
				'$between': [data.lowerPownid ? data.lowerPownid : 0, data.upperPownid ? data.upperPownid :Number.MAX_VALUE] 
			},
			postime: data.postime ? data.postime : {
				'$between': [new Date(data.fromPosttime ? data.fromPosttime : "2010-01-01 00:00:00"), new Date(data.toPosttime ? data.toPosttime : "2200-01-01 00:00:00")]
			},
			// ptotalfinal: data.ptotalfinal ? data.ptotalfinal : {
			// 	'$between': [data.lowerPtotalfinal ? data.lowerPtotalfinal : 0, data.upperPtotalfinal ? data.upperPtotalfinal : Number.MAX_VALUE]
			// },
			min_amount: data.min_amount ? data.min_amount : {
				'$between': [data.lowerMin_Amount ? data.lowerMin_Amount : 0, data.upperMin_Amount ? data.upperMin_Amount : Number.MAX_VALUE]
			},
			max_amount: data.max_amount ? data.max_amount : {
				'$between': [data.lowerMax_Amount ? data.lowerMax_Amount : 0, data.upperMax_Amount ? data.upperMax_Amount : Number.MAX_VALUE]
			},
			fund_endtime: data.fund_endtime ? data.fund_endtime : {
				'$between': [new Date(data.fromFund_Endtime ? data.toFund_Endtime : "2010-01-01 00:00:00"), new Date(data.fromFund_Endtime ? data.toFund_Endtime : "2200-01-01 00:00:00")]
			},
			// pro_endtime: data.pro_endtime ? data.pro_endtime : ((data.lowerPro_Endtime || data.upperPro_Endtime) ? {
			// 	'$between': [new Date(data.lowerPro_Endtime ? data.lowerPro_Endtime : "2010-01-01 00:00:00"), new Date(data.upperPro_Endtime ? data.upperPro_Endtime : "2200-01-01 00:00:00")]
			// } : null),
			UpdatedAt: data.updateAt ? data.updateAt : {
				'$between': [new Date(data.updateAt ? data.updateAt : "2010-01-01 00:00:00"), new Date(data.updateAt ? data.updateAt : "2200-01-01 00:00:00")]
			},
			pname: data.pname ? data.pname : {
				'$like': data.keywordOfPname ? '%' + data.keywordOfPname + '%' : '%'
			},
			pdescription: data.pdescription ? data.pdescription: {
				'$like': data.keywordOfPdescription ? '%' + data.keywordOfPdescription + '%' : '%'
			},
			pstatus: data.pstatus ? data.pstatus : {
				'$like': data.pstatus ? '%' + data.pstatus + '%' : '%'
			}
		}
	});
	return certainProjects;
}

const insertProjects = async function(data) {
	await Projects.create({
		pname: data.pname,
    	pdescription: data.pdescription,
    	pownid: data.pownid,
    	min_amount: data.min_amount,
    	max_amount: data.max_amount,
    	ptotalfinal: data.ptotalfinal,
    	fund_endtime: data.fund_endtime,
    	pro_endtime: data.pro_endtime,
    	ppic: data.ppic,
    	pstatus: data.pstatus,
	});
}

const stopProjects = async function(data) {
	await Projects.update({
		pstatus: 'stop'}, {
		where: {
			pid: data.pid ? data.pid : {
				'$between': [0, Number.MAX_VALUE]
			},
			pownid: data.pownid ? data.pownid : {
				'$between': [0, Number.MAX_VALUE]
			}
		}
	});
}

const updateProject = async function(data) {
	await Projects.update (data, {
		where: {
			pid: data.pid
		}
	});
}

module.exports = {
	getProjects,
	insertProjects,
	stopProjects,
	updateProject
}