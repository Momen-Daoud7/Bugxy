const ticketServices = require('../../../src/services/ticket.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const Ticket = require('../../../src/models/3-ticket');
const connect = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await connect()
})


let user1,user2,project1,ticket1;
beforeEach(async () => {
	await User.deleteMany({})
	await Project.deleteMany({})
	await Ticket.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'manager',
		password:"1223393"
	})
	user2 = new User({
		name:"Ahmed Daoud Momen Daoud",
		email:"ahmed@mail.com",
		role:'developer',
		password:"1223393"
	})

	project1 = new Project({
		name: "E Commenerce",
		description: "E Commenerce website using php and node"
	})

	ticket1 = new Ticket({
		title: "Add filtering",
		description: "filter searching results",
		status: 'open',
		type:'feature request',
		piorty: 'high',
		developer:user1._id,
		project:project1._id,
		submitter:"Ahmed"
	})
	ticket2 =  new Ticket({
		title: "Improve the api",
		description: "refactor the api",
		status: 'in progress',
		type:'feature request',
		piorty: 'low',
		developer:user1._id,
		project:project1._id,
		submitter:"Momen",
		project:project1._id
	})

	await user1.save();
	await user2.save();
	await project1.save();
	await ticket1.save();
	await ticket2.save();

})

describe('ticket services tests', () => {

	it("Should return all tickets",async () => {
		const tickets = await ticketServices.getTickets();
		expect(tickets).toEqual(expect.any(Array));
		expect(tickets[0].title).toBe('Add filtering')
		expect(tickets[1].title).toBe('Improve the api')
	})

	describe('test getticket functionallity', () => {

		it("Should get a single ticket", async () => {
			const ticket = await ticketServices.getTicket(ticket1._id);
			expect(ticket.title).toBe('Add filtering')
		})

		it("Should return false when ticket is not exists", async () => {
			const ticket = await ticketServices.getTicket(282);
			expect(ticket).toBe(undefined)
		})
	})

	it("should create new ticket",async () => {
		const data = {
			title: "Random search results",
			description: "Randomaize the search results",
			status: 'in progress',
			type:'feature request',
			piorty: 'medium',
			developer:user2._id,
			submitter:"Momen",
			project:project1._id
		}
		const ticket = await ticketServices.store(data)
		expect(ticket.title).toBe(data.title)
	})

	describe("Test update ticket functionallity",() => {

		it("Should update a ticket details",async () => {
			const data = {title: "syntax error"}
			const ticket = await ticketServices.update(ticket1._id,data)
			expect(ticket.title).toBe(data.title)
		})

		it("Should return false or undefined when updateing unexiting ticket",async () => {
			const data = {title:'syntax error'}
			const ticket = await ticketServices.update(11,data)
			expect(ticket).toBe(undefined)
		})
	})


	describe("Test delete ticket functionallity",() => {

		it("Should delete a ticket",async () => {
			const ticket = await ticketServices.delete(ticket1._id)
			expect(ticket).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting ticket",async () => {
			const ticket = await ticketServices.delete(100)
			expect(ticket).toBe(undefined)
		})
	})

})