const Ticket = require('../models/3-ticket');

module.exports = class TicketServices {
	// get all Tickets
	static async getTickets() {
		try{
			const tickets = await Ticket.find({});
			return tickets;
		}catch(error) {
			console.log(error);
		}
	}

	// get all developer's Tickets
	static async getDeveloperTickets(developer) {
		try{
			const tickets = await Ticket.find({developer});
			return tickets;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Ticket
	static async store(data) {
		try{
			const ticket = await Ticket.create(data);
			return ticket;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Ticket
	static async update(TicketId,data) {
		try{
			const oldTicket = await Ticket.findById(TicketId)
			if(!oldTicket) {
				return  false;
			}
			const updatedTicket = await Ticket.findByIdAndUpdate(TicketId,data,{
				new:true,
				runValidators:true
			});
			return updatedTicket;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Ticket
	static async delete(TicketId) {
		try{
			const ticket = await Ticket.findById(TicketId);
			if(!ticket) {
				return false;
			}
			const deleted = await ticket.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Ticket
	static async getTicket(TicketId) {
		try{
			const ticket = await Ticket.findById(TicketId).populate('developer');
			if(!ticket) {
				console.log('no Ticket with that id');
				return false;
			}
			return ticket;
		}catch(error) {
			console.log(error);
		}
	}

	
}