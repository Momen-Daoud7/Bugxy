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
const { protect,authorize } = require('../middleware/auth')

// Validation
const {
	projectValidationRules,
	createValidate,
	editValidate
} = require('../validation/projects');

const router = express.Router();


// router.use(protect)

router.get('/',getProjects);

router.get('/add',authorize('admin','manager'),createPage);

router.post('/create',authorize('admin','manager'),projectValidationRules(),createValidate,createProject);

router.get('/edit/:projectId',authorize('admin','manager'),editPage);

router.post('/update/:projectId',authorize('admin','manager'),projectValidationRules(),editValidate,updateProject);

router.post('/delete/:projectId',authorize('admin','manager'),deleteProject);

router.get('/:projectId',authorize('admin','manager'),getProject);


module.exports = router;