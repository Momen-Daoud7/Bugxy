const express = require('express');
const  {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	createPage,
	editPage
} = require('../controllers/users');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	createValidationRules,
	createValidate,
	editValidationRules,
	editValidate
} = require('../validation/users');

const router = express.Router();


router.use(protect)

router.get('/',authorize('admin'),getUsers);

router.get('/add',authorize('admin'),createPage);

router.post('/create',authorize('admin'),createValidationRules(),createValidate,createUser);

router.get('/edit/:userId',authorize('admin'),editPage);

router.post('/update/:userId',authorize('admin'),editValidationRules(),editValidate,updateUser);

router.post('/delete/:userId',authorize('admin'),deleteUser);

router.get('/:userId',authorize('admin'),getUser);


module.exports = router;