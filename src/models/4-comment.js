const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Ticket = require('./3-ticket')

const Comment = database.define('comments', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	message: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

User.hasMany(Comment);
Ticket.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Ticket);


module.exports = Comment; 