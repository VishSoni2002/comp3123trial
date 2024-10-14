const express = require("express");
const {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require("../controller/employeeController");
const { protect } = require("../middleWare/authMiddleware");
const route = express.Router();

route.get('/employees', protect, getAllEmployees);
route.post('/employees', protect, addEmployee);
route.get('/employees/:id', protect, getEmployeeById);
route.put('/employees/:id', protect, updateEmployee);
route.delete('/employees/:id', protect, deleteEmployee);


module.exports = route;
