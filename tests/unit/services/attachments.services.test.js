const attachmentServices = require('../../../src/services/attachment.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const Ticket = require('../../../src/models/3-ticket');
const Attachment = require('../../../src/models/4-attachment');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Project.destroy({where:{}})
	await Ticket.destroy({where:{}})
	await Attachment.destroy({where:{}})

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
		}
	])

	await Attachment.bulkCreate([
		{
			id:1,
			file:"image.jpg",
			ticketId:1
		}
	])
})

describe('attachment services tests', () => {

	it("Should return all attachments",async () => {
		const attachments = await attachmentServices.getAttachments();
		expect(attachments).toEqual(expect.any(Array));
		expect(attachments[0].file).toBe('image.jpg')
	})

	describe('test getattachment functionallity', () => {

		it("Should get a single attachment", async () => {
			const attachment = await attachmentServices.getAttachment(1);
			expect(attachment.file).toBe('image.jpg')
		})

		it("Should return false when attachment is not exists", async () => {
			const attachment = await attachmentServices.getAttachment(282);
			expect(attachment).toBe(false)
		})
	})

	it("should create new attachment",async () => {
		const data = {
			file: 'go.pdf',
			ticketId:1
		}
		const attachment = await attachmentServices.store(data)
		expect(attachment.file).toBe(data.file)
	})

	describe("Test update attachment functionallity",() => {

		it("Should update a attachment details",async () => {
			const data = {file: 'go.pdf'}
			const attachment = await attachmentServices.update(1,data)
			expect(attachment.title).toBe(data.title)
		})

		it("Should return false when updateing unexiting attachment",async () => {
			const data = {file: 'go.pdf'}
			const attachment = await attachmentServices.update(11,data)
			expect(attachment).toBe(false)
			expect(attachment.name).toBe(undefined)
		})
	})


	describe("Test delete attachment functionallity",() => {

		it("Should delete a attachment",async () => {
			const attachment = await attachmentServices.delete(1)
			expect(attachment).toBe(true)
		})

		it("Should return false when updateing unexiting attachment",async () => {
			const attachment = await attachmentServices.delete(100)
			expect(attachment).toBe(false)
		})
	})

})