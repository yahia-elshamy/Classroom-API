const Student = require("../models/Student");

const createStudent = async (req, res)=>{
    try {
        const {name, email} = req.body;

        if(!name || !email) {
            return res.status(400).json({success: false, msg: "All fields are required"});
        }
        else {
            const newStudent = new Student({name, email});
            await newStudent.save();
            res.status(201).json({success: true, data: newStudent});
        }
    }
    catch(error) {
        if(error.code === 11000) {
            return res.status(400).json({success: false, msg: "Email already exists"});
        }
        res.status(500).json({success: false, error: error.message});
    }
};

const deleteStudent = async (req, res) =>{
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);

        if(!deleteStudent) {
            return res.status(400).json({success: false, msg: "Student not found"});
        }
        else {
            res.status(200).json({success: true, msg: "Student deleted successfully"});
        }
    }
    catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
};

module.exports = {
    createStudent,
    deleteStudent
}