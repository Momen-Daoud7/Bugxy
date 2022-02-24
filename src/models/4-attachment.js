const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Ticket = require('./3-ticket')

const Attachment = database.define('attachments', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	file: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

User.hasMany(Attachment);
Ticket.hasMany(Attachment);
Attachment.belongsTo(User);
Attachment.belongsTo(Ticket);


module.exports = Attachment; 