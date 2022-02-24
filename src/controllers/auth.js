const bcrypt = require('bcryptjs');
const userServices = require('../services/user.services');
const User = require('../models/1-user');

// Get register page
exports.getRegister = async (req,res,next) => {
	try {
		res.render('auth/register',{
			pageTitle:'Register',
			errors:''
		})
	}catch(err) {
		console.log(err)
	}
}

// Get login page
exports.getLogin = async (req,res,next) => {
	try {
		console.log(req.session)
		res.render('auth/login',{
			pageTitle:'login',
			errors:''
		})
	}catch(err) {
		console.log(err)
	}
}

// Register a new user
exports.postRegister = async (req,res,next) => {
	try {

		//hash the passowrd and create new user
		const hasedPassword = await bcrypt.hash(req.body.password,12);
		req.body.password = hasedPassword;

		const user = await userServices.store(req.body);
		res.redirect('/login')

	}catch(err) {
		console.log(err)
	}
}

// Login user
exports.postLogin = async (req,res,next) => {
	try {

		const user = await User.findOne({where:{email:req.body.email}});
		if(!user) {
			return res.render('auth/login',{
				pageTitle:'login',
				errors:['Invalid email']
			})
		}

		// Check for the password
		const matchedPassword = await user.matchPassword(req.body.password);

		if(!matchedPassword) {
			console.log(matchedPassword)
			return res.redirect('/login')
		}

		//redirect to the user profile after save him in the session
		console.log(req.session)
		req.session.user = user;
		res.redirect('/');

	}catch(err) {
		console.log(err)
	}
}

exports.logout = async (req,res) => {
	try {
		const loggedOut = await req.session.destroy();
		return res.redirect('/login');
	}
	catch(error) {
		console.log(error);
	}
}

exports.profile = async (req,res,next) => {
	try {
		res.render('auth/profile',{
			pageTitle: `${req.session.user.name} profile`
		})
	}catch(err) {
		console.log(err)
	}

}