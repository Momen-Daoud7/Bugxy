const projectServices = require('../../../src/services/project.services')
const User = require('../../../src/models/1-user');
const Project = require('../../../src/models/2-project');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Project.destroy({where:{}})

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
		{
			id:2,
			name: "Taxi app",
			description: "a taxi app built with node and express"
		}
	])
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
			const project = await projectServices.getProject(1);
			expect(project.name).toBe('E Commenerce')
		})

		it("Should return false when project is not exists", async () => {
			const project = await projectServices.getProject(282);
			expect(project).toBe(false)
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
			const project = await projectServices.update(1,data)
			expect(project.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting project",async () => {
			const data = {name: "John Do"}
			const project = await projectServices.update(11,data)
			expect(project).toBe(false)
			expect(project.name).toBe(undefined)
		})
	})


	describe("Test delete project functionallity",() => {

		it("Should delete a project",async () => {
			const project = await projectServices.delete(1)
			expect(project).toBe(true)
		})

		it("Should return false when updateing unexiting project",async () => {
			const project = await projectServices.delete(100)
			expect(project).toBe(false)
		})
	})

})