const express = require('express')
const { getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../Controllers/employeeController')
const router = express.Router()

router.get('/', getEmployee)
router.get('/:id', getEmployeeById);
router.post('/', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router 