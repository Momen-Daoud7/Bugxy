const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const database = require('../config/database');

const User = database.define('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
	    type: Sequelize.STRING,
	    allowNull:false,
	    unique: true,
	    validate: {
	    	isEmail:true
	    }
  	},
    role: {
	    type: Sequelize.ENUM('manager','developer','admin'),
	    allowNull:false
  	},
    password: {
	    type: Sequelize.STRING,
	    allowNull:false,
  	},

});

// Match passwords
User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
  }

module.exports = User; 