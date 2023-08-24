const studentMdel = require("./StudentModel")

class StudentController {

    async AddStudent(req, res) {
        try {
            const { name, std } = req.body
            if (!name) return res.status(400).send({ message: "Missing Dependency Name" })
            if (!std) return res.status(400).send({ message: "Missing Dependency std" })
            const result = await studentMdel.InsertStudent(req.body)
            if (result) return res.status(200).send({ message: "Success" })
            return res.status(400).send({ message: "Somthing Went Wrong" })
        } catch (error) {
            return res.status(400).send({ message: "Internal Server Error" })
        }
    }

    async GetStudent(req, res) {
        try {
            const result = await studentMdel.GetStudent()
            if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ messsage: "Success", student: result })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Erorr" })
        }
    }

}

const studentController = new StudentController()
module.exports = studentController