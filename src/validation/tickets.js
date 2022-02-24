const {body , validationResult} = require('express-validator');


// create validation rules
exports.createValidationRules = () => {
	return [
		body('title',"please add a valid name").isLength({min:3}).isString(),
		body('description',"please add a valid description").isLength({min:3}).isString(),
		body('status','please add a valid status').isIn(['open','in progress','close']),
		body('piorty','please add a valid piorty').isIn(['high','medium','low']),
		body('type','please add a valid type').isIn(['bugs','feature request','document request']),
	];
};



// check if there're errors
exports.createValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('tickets/create', {
		pageTitle: 'Create ticket',
		errors: errors.array(),
	});
}

exports.editValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render(`tickets/edit`, {
		pageTitle: 'Edit',
		errors: errors.array(),
	});
}
