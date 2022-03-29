const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	message:{
		type:String,
		required:[true,"Message is required."]
	},
	user: {
		type:Schema.Types.ObjectId,
		ref:'user',
		required:[true,"User is required."]
	},
	ticket: {
		type:Schema.Types.ObjectId,
		ref:'ticket',
		required:[true,"Ticket is required."]
	}
});

const Comment = mongoose.model('comment',CommentSchema);

module.exports = Comment;