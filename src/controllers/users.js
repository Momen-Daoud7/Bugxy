const bcrypt = require('bcryptjs');
const userServices = require('../services/user.services');

// Get all users
exports.getUsers = async(req,res,next) => {
	try {
		const users = await userServices.getUsers();
		res.render('users/index', {
			pageTitle: 'Users',
			users
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single user
exports.getUser = async(req,res,next) => {
	try {
		const user = await userServices.getUser(req.params.userId);
		res.render('users/index', {
			pageTitle: 'User',
			user
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		res.render('users/create', {
			pageTitle: 'Create user',
			errors:undefined
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const user = await userServices.getUser(req.params.userId);
		res.render('users/edit', {
			pageTitle: 'Edit user',
			errors:undefined,
			user
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new user
exports.createUser = async(req,res,next) => {
	try {
		//hash the passowrd and create new user
		const hasedPassword = await bcrypt.hash(req.body.password,12);
		req.body.password = hasedPassword;

		await userServices.store(req.body);
		res.redirect('/users')
	}catch(error) {
		console.log(error)
	}
}

// update user
exports.updateUser = async(req,res,next) => {
	try {
		// check if the user update his password
		if(req.body.password) {
			//hash the passowrd and create new user
			const hasedPassword = await bcrypt.hash(req.body.password,12);
			req.body.password = hasedPassword;
		}

		const user = await userServices.update(req.params.userId,req.body);
		res.redirect('/users')
	}catch(error) {
		console.log(error)
	}
}

// Delete a user
exports.deleteUser = async(req,res,next) => {
	try {
		await userServices.delete(req.params.userId);
		res.redirect('/users')
	}catch(error) {
		console.log(error)
	}
}