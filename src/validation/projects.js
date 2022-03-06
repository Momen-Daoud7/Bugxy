const {body , validationResult} = require('express-validator');


// create validation rules
exports.projectValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}).isString(),
		body('description',"please add a valid description").isLength({min:3}).isString(),
	];
};



// check if there're errors
exports.createValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('projects/create', {
		pageTitle: 'Create project',
		errors: errors.array(),
	});
}

exports.editValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render(`projects/edit`, {
		pageTitle: 'Edit',
		errors: errors.array(),
	});
}
