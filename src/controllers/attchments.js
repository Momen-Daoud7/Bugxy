const ticketServices = require('../services/ticket.services');
const attachmentServices = require('../services/attachment.services');

// Get all attachments
exports.getAttachments = async(req,res,next) => {
	try {
		const attachments = await attachmentServices.getAttachments();
		res.render('attachments/index', {
			pageTitle: 'attachments',
			attachments
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single attachment
exports.getAttachment = async(req,res,next) => {
	try {
		const attachment = await attachmentServices.getAttachment(req.params.attachmentId);
		res.render('attachments/index', {
			pageTitle: 'attachment',
			attachment
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		const tickets = await ticketServices.getTickets()
		res.render('attachments/create', {
			pageTitle: 'Create attachment',
			errors:undefined,
			tickets,
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const attachment = await attachmentServices.getAttachment(req.params.attachmentId);
		res.render('attachments/edit', {
			pageTitle: 'Edit attachment',
			errors:undefined,
			attachment
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new attachment
exports.createAttachment = async(req,res,next) => {
	try {
		await attachmentServices.store(req.body);
		res.redirect('/attachments')
	}catch(error) {
		console.log(error)
	}
}

// update attachment
exports.updateAttachment = async(req,res,next) => {
	try {
		const attachment = await attachmentServices.update(req.params.attachmentId,req.body);
		res.redirect('/attachments')
	}catch(error) {
		console.log(error)
	}
}

// Delete a attachment
exports.deleteAttachment = async(req,res,next) => {
	try {
		await attachmentServices.delete(req.params.attachmentId);
		res.redirect('/attachments')
	}catch(error) {
		console.log(error)
	}
}