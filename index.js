require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected successfully");
    }
    catch(error){
        console.log("Failed to connect due to error: ", error);
    }
};

dbConnection();

const classroomRoute = require("./Routes/classroomRoute");
const studentRoute = require("./Routes/studentRoute");

app.use("/api", classroomRoute);
app.use("/api", studentRoute);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});