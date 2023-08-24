const express = require("express")
const DBConnect = require("./DBConnection")
const studentController = require("./Student/StudentController")
const subjectController = require("./Subject/SubjectController")
const marksController = require("./Marks/MarksController")
const cors = require("cors")

const app = express()

DBConnect()

app.use(express.json())

app.use(cors())

app.post("/student", studentController.AddStudent)

app.get("/getstudent" , studentController.GetStudent)

app.post("/subject", subjectController.AddSubject)

app.get("/getsubject" , subjectController.GetSubject)

app.post("/marks", marksController.AddMarks)

app.get("/marks/:id", marksController.ShowResult)

app.listen(5500, () => {
    console.log("Server Started")
})