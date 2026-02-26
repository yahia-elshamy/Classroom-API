const Classroom = require("../models/Classroom");
const Student = require("../models/Student");

const createClassroom = async (req, res) =>{
    try {
        const {name, students} = req.body;
        
        if(!name || !students){
            return res.status(400).json({success: false, msg: "All fields are required"});
        }
        else {
            const newClassroom = new Classroom({name, students});
            await newClassroom.save();
            res.status(201).json({success: true, msg: "Classroom created"});
        }
    }
    catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const getClassroom = async (req, res) =>{
    try {
        const classrooms = await Classroom.find().populate("students", "name email");
        res.status(200).json({success: true, data: classrooms});
    }
    catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
};

module.exports = {
    createClassroom,
    getClassroom
};