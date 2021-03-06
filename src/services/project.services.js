const Project = require('../models/2-project');

module.exports = class ProjectServices {
	// get all Projects
	static async getProjects() {
		try{
			const projects = await Project.findAll();
			return projects;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Project
	static async store(data) {
		try{
			const project = await Project.create(data);
			return project;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Project
	static async update(ProjectId,data) {
		try{
			const oldProject = await Project.findByPk(ProjectId)
			if(!oldProject) {
				return  false;
			}
			const updatedProject = await oldProject.update(data);
			return updatedProject;
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Project
	static async delete(ProjectId) {
		try{
			const project = await Project.findByPk(ProjectId);
			if(!project) {
				return false;
			}
			const deleted = await project.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Project
	static async getProject(ProjectId) {
		try{
			const project = await Project.findByPk(ProjectId);
			if(!project) {
				console.log('no Project with that id');
				return false;
			}
			return project;
		}catch(error) {
			console.log(error);
		}
	}

	
}