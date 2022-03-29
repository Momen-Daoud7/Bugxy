const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
	title: {
		type: String,
		required:[true,"Name is required."]
	},
	description: {
		type: String,
		required:[true,"Description is required."]
	},
	status: {
		type:String,
		enum:['close','open','in progress'],
		required:[true,"Status is required"]
	},
	type: {
		type:String,
		enum:['bugs','feature request','document request'],
		required:[true,"Status is required"]
	},
	piorty: {
		type:String,
		enum:['high','medium','low'],
	},
	submitter: {
		type:String,
		required:[true,"Submitter is required"]
	},
	project: {
		type: Schema.Types.ObjectId,
		ref:'project',
		required:[true,"Project is required"]
	},
	developer: {
		type:  Schema.Types.ObjectId,
		ref:'user',
		required:[true,"Developer is required"]
	},
	comments:[{
		type:  Schema.Types.ObjectId,
		ref:'comments'
	}]
});


const Ticket = mongoose.model('ticket',TicketSchema);

module.exports = Ticket;