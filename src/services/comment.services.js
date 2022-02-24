const Comment = require('../models/5-comment');

module.exports = class CommentServices {
	// get all Comments
	static async getComments() {
		try{
			const comments = await Comment.findAll();
			return comments;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Comment
	static async store(data) {
		try{
			const comment = await Comment.create(data);
			return comment;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Comment
	static async update(CommentId,data) {
		try{
			const oldComment = await Comment.findByPk(CommentId)
			if(!oldComment) {
				return  false;
			}
			const updatedComment = await oldComment.update();
			console.log(updatedComment)
				return updatedComment;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Comment
	static async delete(CommentId) {
		try{
			const comment = await Comment.findByPk(CommentId);
			if(!comment) {
				return false;
			}
			const deleted = await comment.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Comment
	static async getComment(CommentId) {
		try{
			const comment = await Comment.findByPk(CommentId);
			if(!comment) {
				console.log('no Comment with that id');
				return false;
			}
			return comment;
		}catch(error) {
			console.log(error);
		}
	}

	
}