const express = require('express');
const  {
	getComments,
	getComment,
	createComment,
	updateComment,
	deleteComment,
	createPage,
	editPage
} = require('../controllers/comments');

// middlewares
const { protect } = require('../middleware/auth')

// Validation
const {
	commentValidationRules,
	createValidate,
	editValidate
} = require('../validation/comments');

const router = express.Router();


router.use(protect)

router.get('/',getComments);

router.get('/add',createPage);

router.post('/create',commentValidationRules(),createValidate,createComment);

router.get('/edit/:commentId',editPage);

router.post('/update/:commentId',commentValidationRules(),editValidate,updateComment);

router.post('/delete/:commentId',deleteComment);

router.get('/:commentId',getComment);


module.exports = router;