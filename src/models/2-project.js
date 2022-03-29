const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	name: {
		type: String,
		require:[true,"Name is required."]
	},
	description: {
		type:String,
		required:[true,"Description is required."]
	},
	tickets:[{
		type:  Schema.Types.ObjectId,
		ref:'tickets'
	}]
})

const Project = mongoose.model('project',ProjectSchema);

module.exports = Project;