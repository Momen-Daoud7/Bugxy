const ticketServices = require('../../../src/services/ticket.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const Ticket = require('../../../src/models/3-ticket');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Project.destroy({where:{}})
	await Ticket.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'manager',
			password:"1223393"
		},
		{
			id:2,
			name:"Ahmed Daoud Momen Daoud",
			email:"ahmed@mail.com",
			role:'captin',
			password:"1223393"
		}

	])

	await Project.bulkCreate([
		{
			id:1,
			name: "E Commenerce",
			description: "E Commenerce website using php and node"
		},
	])

	await Ticket.bulkCreate([
		{
			id:1,
			title: "Add filtering",
			description: "filter searching results",
			status: 'open',
			type:'feature request',
			piorty: 'high',
			developer:1,
			submitter:2
		},
		{
			id:2,
			title: "Improve the api",
			description: "refactor the api",
			status: 'in progress',
			type:'feature request',
			piorty: 'low',
			developer:1,
			submitter:2
		},
	])
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
			const ticket = await ticketServices.getTicket(1);
			expect(ticket.title).toBe('Add filtering')
		})

		it("Should return false when ticket is not exists", async () => {
			const ticket = await ticketServices.getTicket(282);
			expect(ticket).toBe(false)
		})
	})

	it("should create new ticket",async () => {
		const data = {
			title: "Random search results",
			description: "Randomaize the search results",
			status: 'in progress',
			type:'feature request',
			piorty: 'medium',
			developer:1,
			submitter:2
		}
		const ticket = await ticketServices.store(data)
		expect(ticket.title).toBe(data.title)
	})

	describe("Test update ticket functionallity",() => {

		it("Should update a ticket details",async () => {
			const data = {title: "syntax error"}
			const ticket = await ticketServices.update(1,data)
			expect(ticket.title).toBe(data.title)
		})

		it("Should return false when updateing unexiting ticket",async () => {
			const data = {title:'syntax error'}
			const ticket = await ticketServices.update(11,data)
			expect(ticket).toBe(false)
			expect(ticket.name).toBe(undefined)
		})
	})


	describe("Test delete ticket functionallity",() => {

		it("Should delete a ticket",async () => {
			const ticket = await ticketServices.delete(1)
			expect(ticket).toBe(true)
		})

		it("Should return false when updateing unexiting ticket",async () => {
			const ticket = await ticketServices.delete(100)
			expect(ticket).toBe(false)
		})
	})

})