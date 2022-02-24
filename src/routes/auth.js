const express = require('express');
const  {
	getRegister,
	getLogin,
	logout,
	postRegister,
	postLogin,
	profile
} = require('../controllers/auth');

// Middlewares
const { protect } = require('../middleware/auth');

// Validation
const {
	loginValidationRules,
	loginValidate,
	registerValidationRules,
	registerValidate
} = require('../validation/auth');

const router = express.Router();

router.get('/register',getRegister);
router.get('/login',getLogin);
router.get('/profile',protect,profile);
router.post('/register', registerValidationRules() , registerValidate ,postRegister);
router.post('/login',loginValidationRules(),loginValidate,postLogin);
router.post('/logout',logout);

module.exports = router