const ticketServices = require('../services/ticket.services');

// Get all tickets
exports.getTickets = async(req,res,next) => {
	try {
		const tickets = await ticketServices.getTickets();
		res.render('tickets/index', {
			pageTitle: 'tickets',
			tickets
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single ticket
exports.getTicket = async(req,res,next) => {
	try {
		const ticket = await ticketServices.getTicket(req.params.ticketId);
		res.render('tickets/index', {
			pageTitle: 'ticket',
			ticket
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		res.render('tickets/create', {
			pageTitle: 'Create ticket',
			errors:undefined
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const ticket = await ticketServices.getTicket(req.params.ticketId);
		res.render('tickets/edit', {
			pageTitle: 'Edit ticket',
			errors:undefined,
			ticket
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new ticket
exports.createTicket = async(req,res,next) => {
	try {

		ticketServices.store(req.body);
		res.redirect('/tickets')
	}catch(error) {
		console.log(error)
	}
}

// update ticket
exports.updateTicket = async(req,res,next) => {
	try {
		const ticket = await ticketServices.update(req.params.ticketId,req.body);
		res.redirect('/tickets')
	}catch(error) {
		console.log(error)
	}
}

// Delete a ticket
exports.deleteTicket = async(req,res,next) => {
	try {
		await ticketServices.delete(req.params.ticketId);
		res.redirect('/tickets')
	}catch(error) {
		console.log(error)
	}
}