const project = require('../models/project.js');

const getCertainProjects = async function(ctx) {
  const data = ctx.request.body;
  const projects = await project.getProjects(data);
  console.log(projects);
  ctx.body = projects;
}

const postProject = async function(ctx) {
	const data = ctx.request.body;
	try {
		await project.insertProjects(data);
		console.log('Add Project pname: ' + data.pname);
		ctx.body = {
			success: true,
			info: 'Project is posted successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.name);
	}
}

const stopProjects = async function(ctx) {
	const data = ctx.request.body;
	try {
		await project.stopProjects(data);
		console.log(data.pid ? 'Stop Project pid: ' + data.pid : 'Stop Project pownid: ' + data.pownid);
		ctx.body = {
			success: true,
			info: 'Project is stoped successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.name);
	}
}

const updateProject = async function(ctx) {
	const data = ctx.request.body;
	try {
		await project.updateProject(data);
		console.log('pid: ' + data.pi + ' is updated successfully');
		ctx.body = {
			success: true,
			info: 'Project is updated successfully'
		};
	} catch(error) {
		ctx.body = {
			success: false,
			info: error.message
		};
		console.log(error.name);
	}
}

module.exports = (router) => {
  router.post('/project/getProjects', getCertainProjects);
  router.post('/project/postProject', postProject);
  router.post('/project/stopProject', stopProjects);
  router.post('/project/updateProject', updateProject);
}