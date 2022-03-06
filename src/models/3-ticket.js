const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Project = require('./2-project');

const Ticket = database.define('tickets', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type:Sequelize.TEXT,
		allowNull:false
	},
	status: {
		type:Sequelize.ENUM('close','open','in progress'),
		allowNull:false
	},
	type: {
		type:Sequelize.ENUM('bugs','feature request','document request'),
		allowNull:false
	},
	piorty: {
		type:Sequelize.ENUM('high','medium','low'),
		allowNull:false	
	},
	submitter: {
		type:Sequelize.STRING,
		allowNull:false
	}

});

Project.hasMany(Ticket);
User.hasMany(Ticket,{foreignKey:'developer'})
Ticket.belongsTo(User,{foreignKey:'developer'})
Ticket.belongsTo(Project)


module.exports = Ticket; 