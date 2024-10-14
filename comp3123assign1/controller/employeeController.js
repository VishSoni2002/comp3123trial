const Employee = require('../models/employeeModel')
const { check, validationResult, param } = require('express-validator');

const getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await Employee.find()

        res.status(200).json({
            status: true,
            data: allEmployees
        });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

const addEmployee = async (req, res) => {

    await check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .run(req);

    await check('salary')
        .optional()
        .isNumeric().withMessage('Salary must be a number')
        .run(req);

    await check('date_of_joining')
        .optional()
        .isISO8601().withMessage('Date of joining must be a valid date')
        .run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }

    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        const newEmployee = await Employee.create(req.body)


        res.status(201).json({
            status: true,
            message: "Employee added successfuly.",
            employeeId: newEmployee._id
        });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

const getEmployeeById = async (req, res) => {

    await param('id')
        .notEmpty().withMessage('Employee ID is required')
        .isMongoId().withMessage('Invalid Employee ID format')
        .run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }


    try {
        const { id } = req.params
        const employeeId = await Employee.findById(id);

        if (!employeeId) {
            throw new Error('Employee id not found')
        }

        res.status(200).json({
            status: true,
            data: employeeId
        });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}

const updateEmployee = async (req, res) => {

    await param('id')
        .notEmpty().withMessage('Employee ID is required')
        .isMongoId().withMessage('Invalid Employee ID format')
        .run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }


    try {
        const { id } = req.params
        const employeeId = await Employee.findByIdAndUpdate(id, req.body);

        res.status(200).json({
            status: true,
            message: "Employee details updated successfully"
        });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}


const deleteEmployee = async (req, res) => {

    await param('id')
        .notEmpty().withMessage('Employee ID is required')
        .isMongoId().withMessage('Invalid Employee ID format')
        .run(req);


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }


    try {
        const { id } = req.params
        const employeeId = await Employee.findByIdAndDelete(id);

        res.status(204).json({
            status: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
}



module.exports = {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
}