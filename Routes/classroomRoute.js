const express = require("express");
const router = express.Router();

const {createClassroom, getClassroom} = require("../controllers/classroomController");

router.post("/classrooms", createClassroom);

router.get("/classrooms", getClassroom);

module.exports = router;