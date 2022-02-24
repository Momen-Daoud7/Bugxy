const express = require('express');
const  {
	getAttachments,
	getAttachment,
	createAttachment,
	updateAttachment,
	deleteAttachment,
	createPage,
	editPage
} = require('../controllers/attachments');

// middlewares
const { protect } = require('../middleware/auth')

// Validation
const {
	attachmentValidationRules,
	createValidate,
	editValidate
} = require('../validation/attachments');

const router = express.Router();


router.use(protect)

router.get('/',getAttachments);

router.get('/add',createPage);

router.post('/create',attachmentValidationRules(),createValidate,createAttachment);

router.get('/edit/:attachmentId',editPage);

router.post('/update/:attachmentId',attachmentValidationRules(),editValidate,updateAttachment);

router.post('/delete/:attachmentId',deleteAttachment);

router.get('/:attachmentId',getAttachment);


module.exports = router;