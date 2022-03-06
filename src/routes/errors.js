const express = require('express');
const  { error500, error404 } = require('../controllers/errors');

const router = express.Router();

router.get('/error/500',error500);
router.get('*',error404);

module.exports = router