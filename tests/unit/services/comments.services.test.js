const commentServices = require('../../../src/services/comment.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const Ticket = require('../../../src/models/3-ticket');
const Comment = require('../../../src/models/4-comment');
const connect = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await connect()
})

let user1,user2,project1,ticket1,comment1;
beforeEach(async () => {
	await User.deleteMany({})
	await Project.deleteMany({})
	await Ticket.deleteMany({})
	await Comment.deleteMany({})

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

	comment1 = new Comment({
		message:"Keep going bro almost there",
		ticket:ticket1._id,
		user:user2._id
	})

	await user1.save();
	await user2.save();
	await project1.save();
	await ticket1.save();
	await comment1.save();
})

describe('comment services tests', () => {

	it("Should return all comments",async () => {
		const comments = await commentServices.getComments();
		expect(comments).toEqual(expect.any(Array));
		expect(comments[0].message).toBe('Keep going bro almost there')
	})

	describe('test getcomment functionallity', () => {

		it("Should get a single comment", async () => {
			const comment = await commentServices.getComment(comment1._id);
			expect(comment.message).toBe('Keep going bro almost there')
		})

		it("Should return false or undefined when comment is not exists", async () => {
			const comment = await commentServices.getComment(282);
			expect(comment).toBe(undefined)
		})
	})

	it("should create new comment",async () => {
		const data = {
			message: "Great work!",
			ticket:ticket1._id,
			user:user2._id
		}
		const comment = await commentServices.store(data)
		expect(comment.message).toBe(data.message)
	})

	describe("Test update comment functionallity",() => {

		it("Should update a comment details",async () => {
			const data = {message: 'nice'}
			const comment = await commentServices.update(comment1._id,data)
			expect(comment.message).toBe(data.message)
		})

		it("Should return false or undefined when updateing unexiting comment",async () => {
			const data = {message: 'nice'}
			const comment = await commentServices.update(11,data)
			expect(comment).toBe(undefined)
		})
	})


	describe("Test delete comment functionallity",() => {

		it("Should delete a comment",async () => {
			const comment = await commentServices.delete(comment1._id)
			expect(comment).toBe(true)
		})

		it("Should return false or undefined when updateing unexiting comment",async () => {
			const comment = await commentServices.delete(100)
			expect(comment).toBe(undefined)
		})
	})

})