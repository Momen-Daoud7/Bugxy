const userServices = require('../services/user.services');
const projectServices = require('../services/project.services');
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

// Get developer tickets
exports.getDeveloperTickets = async(req,res,next) => {
	try {
		const tickets = await ticketServices.getDeveloperTickets(req.session.user.id);
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
		res.render('tickets/details', {
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
		const developers = await userServices.getUserByRole('developer');
		const projects = await projectServices.getProjects();

		res.render('tickets/create', {
			pageTitle: 'Create ticket',
			errors:undefined,
			developers,
			projects
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const ticket = await ticketServices.getTicket(req.params.ticketId);
		const developers = await userServices.getUserByRole('developer');
		const projects = await projectServices.getProjects();
		res.render('tickets/edit', {
			pageTitle: 'Edit ticket',
			errors:undefined,
			ticket,
			developers,
			projects
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new ticket
exports.createTicket = async(req,res,next) => {
	try {
		req.body.submitter = req.session.user.name
		await ticketServices.store(req.body);
		res.redirect('/tickets')
	}catch(error) {
		console.log(error)
	}
}

// update ticket
exports.updateTicket = async(req,res,next) => {
	try {
		console.log(req.body)
		const ticket = await ticketServices.update(req.params.ticketId,req.body);
		res.redirect(`/tickets/${req.params.ticketId}`)
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