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
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	commentValidationRules,
	createValidate,
	editValidate
} = require('../validation/comments');

const router = express.Router();


router.use(protect)

router.get('/',authorize('admin','manager'),getComments);

router.get('/add',authorize('admin','manager'),createPage);

router.post('/create',authorize('admin','manager'),commentValidationRules(),createValidate,createComment);

router.get('/edit/:commentId',authorize('admin','manager'),editPage);

router.post('/update/:commentId',authorize('admin','manager'),commentValidationRules(),editValidate,updateComment);

router.post('/delete/:commentId',authorize('admin','manager'),deleteComment);

router.get('/:commentId',authorize('admin','manager'),getComment);



module.exports = router;