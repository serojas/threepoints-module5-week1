const express = require('express');
const employees = require('../controllers/employees.controller');
const post = require('../controllers/posts.controller');

const router = express.Router();

router.get('/employees', employees.getEmployees)
router.get('/employees/oldest', employees.getOldest)
router.get('/employees/:NAME', employees.getEmployeeByName)

router.post('/employees', post.addEmployee)

module.exports = router;