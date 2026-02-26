const express = require("express");
const router = express.Router();

const {createStudent, deleteStudent} = require("../controllers/studentController");


router.post("/students", createStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;