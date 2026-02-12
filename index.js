require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

const Student = require("./models/Student");
const Classroom = require("./models/Classroom");

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected successfully");
    }
    catch(error){
        console.log("Failed to connect due to error: ", error);
    }
};

app.post("/api/students", async (req, res)=>{
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
});

app.post("/api/classrooms", async (req, res) =>{
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
});


app.get("/api/classrooms", async (req, res) =>{
    try {
        const classrooms = await Classroom.find().populate("students", "name email");
        res.status(200).json({success: true, data: classrooms});
    }
    catch(error) {
        res.status(500).json({success: false, error: error.message});
    }
});

app.delete("/api/students/:id", async (req, res) =>{
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
});

dbConnection();

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});