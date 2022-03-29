const projectServices = require('../../../src/services/project.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const connect = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await connect()
})

let user1,user2,project1,project2;
beforeEach(async () => {
	await User.deleteMany({})
	await Project.deleteMany({})

	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'manager',
		password:"1223393"
	})
	user2 = new	User({
		name:"Ahmed Daoud Momen Daoud",
		email:"ahmed@mail.com",
		role:'developer',
		password:"1223393"
	})

	project1 = new Project({
		name: "E Commenerce",
		description: "E Commenerce website using php and node"
	});
	project2 = new Project({
		name: "Taxi app",
		description: "a taxi app built with node and express"
	})

	await user1.save();
	await user2.save();
	await project1.save();
	await project2.save();
})

describe('project services tests', () => {

	it("Should return all projects",async () => {
		const projects = await projectServices.getProjects();
		expect(projects).toEqual(expect.any(Array));
		expect(projects[0].name).toBe('E Commenerce')
		expect(projects[1].name).toBe('Taxi app')
	})

	describe('test getproject functionallity', () => {

		it("Should get a single project", async () => {
			const project = await projectServices.getProject(project1._id);
			expect(project.name).toBe('E Commenerce')
		})

		it("Should return false or undefined when project is not exists", async () => {
			const project = await projectServices.getProject(282);
			expect(project).toBe(undefined)
		})
	})

	it("should create new project",async () => {
		const data = {
			name: "VIdtube app",
			description: "a youtube clone app built with node and express"
		}
		const project = await projectServices.store(data)
		expect(project.name).toBe(data.name)
	})

	describe("Test update project functionallity",() => {

		it("Should update a project details",async () => {
			const data = {name: "John Do"}
			const project = await projectServices.update(project1._id,data)
			expect(project.name).toBe(data.name)
		})

		it("Should return false or undefined when updateing unexiting project",async () => {
			const data = {name: "John Do"}
			const project = await projectServices.update(11,data)
			expect(project).toBe(undefined)
		})
	})


	describe("Test delete project functionallity",() => {

		it("Should delete a project",async () => {
			const project = await projectServices.delete(project1._id)
			expect(project).toBe(true)
		})

		it("Should return false when updateing unexiting project",async () => {
			const project = await projectServices.delete(100)
			expect(project).toBe(undefined)
		})
	})

})