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
const { protect } = require('../middleware/auth')

// Validation
const {
	createValidationRules,
	createValidate,
	editValidationRules,
	editValidate
} = require('../validation/users');

const router = express.Router();


router.use(protect)

router.get('/',getUsers);

router.get('/add',createPage);

router.post('/create',createValidationRules(),createValidate,createUser);

router.get('/edit/:userId',editPage);

router.post('/update/:userId',editValidationRules(),editValidate,updateUser);

router.post('/delete/:userId',deleteUser);


router.get('/:userId',getUser);


module.exports = router;