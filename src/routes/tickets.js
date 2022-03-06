const express = require('express');
const  {
	getTickets,
	getDeveloperTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket,
	createPage,
	editPage
} = require('../controllers/tickets');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	ticketValidationRules,
	createValidate,
	editValidate
} = require('../validation/tickets');

const router = express.Router();


router.use(protect)

router.get('/',authorize('admin','manager'),getTickets);

router.get('/developer',authorize('developer'),getDeveloperTickets);

router.get('/add',authorize('admin','manager'),createPage);

router.post('/create',authorize('admin','manager'),ticketValidationRules(),createValidate,createTicket);

router.get('/edit/:ticketId',authorize('admin','manager'),editPage);

router.post('/update/:ticketId',authorize('admin','manager','developer'),ticketValidationRules(),editValidate,updateTicket);

router.post('/delete/:ticketId',authorize('admin','manager'),deleteTicket);

router.get('/:ticketId',authorize('admin','manager','developer'),getTicket);

module.exports = router;