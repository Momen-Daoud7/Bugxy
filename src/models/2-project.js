const Sequelize = require('sequelize');

const database = require('../config/database');

const Project = database.define('projects', {
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
	description: {
		type:Sequelize.TEXT,
		allowNull:false
	}
});


module.exports = Project; 