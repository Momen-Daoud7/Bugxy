const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type:String,
		required:[true,"Name is required."]
	},
	email: {
		type: String,
		required:[true,"Email is required."],
		unique:true,
		match:[
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      		'Please add a valid email'
		]
	},
	role: {
		type:String,
		enum:['manager','developer','admin'],
		required:[true,"Role is required."]
	},
	password: {
		type:String,
		required:[true,"Password is required."]
	}

})

// Match passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
 }

const User = mongoose.model('user',UserSchema);

module.exports = User;