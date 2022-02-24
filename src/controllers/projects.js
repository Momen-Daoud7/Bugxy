const projectServices = require('../services/project.services');

// Get all projects
exports.getProjects = async(req,res,next) => {
	try {
		const projects = await projectServices.getProjects();
		res.render('projects/index', {
			pageTitle: 'projects',
			projects
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single project
exports.getProject = async(req,res,next) => {
	try {
		const project = await projectServices.getProject(req.params.projectId);
		res.render('projects/index', {
			pageTitle: 'project',
			project
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		res.render('projects/create', {
			pageTitle: 'Create project',
			errors:undefined
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const project = await projectServices.getProject(req.params.projectId);
		res.render('projects/edit', {
			pageTitle: 'Edit project',
			errors:undefined,
			project
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new project
exports.createProject = async(req,res,next) => {
	try {

		await projectServices.store(req.body);
		res.redirect('/projects')
	}catch(error) {
		console.log(error)
	}
}

// update project
exports.updateProject = async(req,res,next) => {
	try {

		const project = await projectServices.update(req.params.projectId,req.body);
		res.redirect('/projects')
	}catch(error) {
		console.log(error)
	}
}

// Delete a project
exports.deleteproject = async(req,res,next) => {
	try {
		await projectServices.delete(req.params.projectId);
		res.redirect('/projects')
	}catch(error) {
		console.log(error)
	}
}