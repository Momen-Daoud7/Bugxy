const commentServices = require('../../../src/services/comment.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const Ticket = require('../../../src/models/3-ticket');
const Comment = require('../../../src/models/5-comment');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Project.destroy({where:{}})
	await Ticket.destroy({where:{}})
	await Comment.destroy({where:{}})

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

	await Comment.bulkCreate([
		{
			id:1,
			message:"Keep going bro almost there",
			ticketId:1
		}
	])
})

describe('comment services tests', () => {

	it("Should return all comments",async () => {
		const comments = await commentServices.getComments();
		expect(comments).toEqual(expect.any(Array));
		expect(comments[0].message).toBe('Keep going bro almost there')
	})

	describe('test getcomment functionallity', () => {

		it("Should get a single comment", async () => {
			const comment = await commentServices.getComment(1);
			expect(comment.message).toBe('Keep going bro almost there')
		})

		it("Should return false when comment is not exists", async () => {
			const comment = await commentServices.getComment(282);
			expect(comment).toBe(false)
		})
	})

	it("should create new comment",async () => {
		const data = {
			message: "Great work!",
			ticketId:1
		}
		const comment = await commentServices.store(data)
		expect(comment.file).toBe(data.file)
	})

	describe("Test update comment functionallity",() => {

		it("Should update a comment details",async () => {
			const data = {message: 'nice'}
			const comment = await commentServices.update(1,data)
			expect(comment.message).toBe(data.message)
		})

		it("Should return false when updateing unexiting comment",async () => {
			const data = {message: 'nice'}
			const comment = await commentServices.update(11,data)
			expect(comment).toBe(false)
			expect(comment.name).toBe(undefined)
		})
	})


	describe("Test delete comment functionallity",() => {

		it("Should delete a comment",async () => {
			const comment = await commentServices.delete(1)
			expect(comment).toBe(true)
		})

		it("Should return false when updateing unexiting comment",async () => {
			const comment = await commentServices.delete(100)
			expect(comment).toBe(false)
		})
	})

})