const ticketServices = require('../services/ticket.services');
const commentServices = require('../services/comment.services');

// Get all comments
exports.getComments = async(req,res,next) => {
	try {
		const comments = await commentServices.getComments();
		res.render('comments/index', {
			pageTitle: 'comments',
			comments
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single comment
exports.getComment = async(req,res,next) => {
	try {
		const comment = await commentServices.getComment(req.params.commentId);
		res.render('comments/index', {
			pageTitle: 'comment',
			comment
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		const tickets = await ticketServices.getTickets()
		res.render('comments/create', {
			pageTitle: 'Create comment',
			errors:undefined,
			tickets
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const comment = await commentServices.getComment(req.params.commentId);
		const tickets = await ticketServices.getTickets()
		res.render('comments/edit', {
			pageTitle: 'Edit comment',
			errors:undefined,
			comment,
			tickets
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new comment
exports.createComment = async(req,res,next) => {
	try {
		await commentServices.store(req.body);
		res.redirect('/comments')
	}catch(error) {
		console.log(error)
	}
}

// update comment
exports.updateComment = async(req,res,next) => {
	try {
		const comment = await commentServices.update(req.params.commentId,req.body);
		res.redirect('/comments')
	}catch(error) {
		console.log(error)
	}
}

// Delete a comment
exports.deleteComment = async(req,res,next) => {
	try {
		await commentServices.delete(req.params.commentId);
		res.redirect('/comments')
	}catch(error) {
		console.log(error)
	}
}