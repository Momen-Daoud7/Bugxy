const express = require('express');
const  {
	getProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
	createPage,
	editPage
} = require('../controllers/projects');

// middlewares
const { protect } = require('../middleware/auth')

// Validation
const {
	projectValidationRules,
	createValidate,
	editValidate
} = require('../validation/projects');

const router = express.Router();


router.use(protect)

router.get('/',getProjects);

router.get('/add',createPage);

router.post('/create',projectValidationRules(),createValidate,createProject);

router.get('/edit/:projectId',editPage);

router.post('/update/:projectId',projectValidationRules(),editValidate,updateProject);

router.post('/delete/:projectId',deleteProject);

router.get('/:projectId',getProject);


module.exports = router;