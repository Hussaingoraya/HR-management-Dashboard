const Employee = require('../Models/employeeModels')

const getEmployee = async (req, res) => {
    try {
        const empData = await Employee.find()
        // if (empData.length === 0) {
        //     return res.status(404).json({ message: "No Employee Found" })
        // }
        res.status(200).json({ message: "Employee Data is here", data: empData })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body)
        const savedEmployee = await newEmployee.save()
        res.status(201).json({ message: 'New Employee Added', data: savedEmployee })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error while saving new emp", error: error.message })


    }

}
const updateEmployee = async (req, res) => {
    try {
        const updateData = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updateData) {
            return res.status(404).json({ message: "No Employee Found with this id" })


        }
        res.status(200).json({ message: ' Employee Updated', data: updateData })


    } catch (error) {
        res.status(501).json({ message: "Internal Server Error while updating emp", error: error.message })


    }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "No Employee Found with this id" });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const deleteEmp = await Employee.findByIdAndDelete(
            req.params.id
        )
        if (!deleteEmp) {
            return res.status(404).json({ message: "No Employee Found with this id" })



        }
        res.status(200).json({ message: ' Employee Deleted', data: deleteEmp })



    } catch (error) {
        res.status(501).json({ message: "Internal Server Error while deleting emp", error: error.message })


    }

}

module.exports = {
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeById
}