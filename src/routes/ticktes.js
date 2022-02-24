const express = require('express');
const  {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket,
	createPage,
	editPage
} = require('../controllers/tickets');

// middlewares
const { protect } = require('../middleware/auth')

// Validation
const {
	ticketValidationRules,
	createValidate,
	editValidate
} = require('../validation/tickets');

const router = express.Router();


router.use(protect)

router.get('/',getTickets);

router.get('/add',createPage);

router.post('/create',ticketValidationRules(),createValidate,createTicket);

router.get('/edit/:ticketId',editPage);

router.post('/update/:ticketId',ticketValidationRules(),editValidate,updateTicket);

router.post('/delete/:ticketId',deleteTicket);

router.get('/:ticketId',getTicket);


module.exports = router;