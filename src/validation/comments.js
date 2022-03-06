const {body , validationResult} = require('express-validator');


// create validation rules
exports.commentValidationRules = () => {
	return [
		body('message',"please add a valid comment").isLength({min:3}).isString(),
	];
};



// check if there're errors
exports.createValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('comments/create', {
		pageTitle: 'Create comment',
		errors: errors.array(),
	});
}

exports.editValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render(`comments/edit`, {
		pageTitle: 'Edit',
		errors: errors.array(),
	});
}
