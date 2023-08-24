const marksMdoel = require("./MarksModel")

class MarksController {

    async AddMarks(req, res) {
        try {
            const { subject, student, marks } = req.body
            if (!subject) return res.status(400).send({ message: "Missing Dipendency Subject" })
            if (!student) return res.status(400).send({ message: "Missing Dipendency student" })
            if (!marks) return res.status(400).send({ message: "Missing Dipendency marks" })
            const result = await marksMdoel.InsertMarks(req.body)
            if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            // if (error && (error.message.match('E11000 '))) {
            //     return res.status(500).send({ message: "This Subject Makrs Alredy Asign" })
            // }
            // console.log(error)
            if (error.code === 11000) {
                console.error("Duplicate key error: The ID already exists.")
                // Handle the error as needed.
            } else {
                throw error;
            }
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

    async ShowResult(req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).send({ message: "Missing Dependecy ID" })
            const result = await marksMdoel.GetResult(id)
            if (result) return res.status(200).send({ message: "Success ", result })
            return res.status(400).send({ message: "Somthing Went Wrong" })
        } catch (error) {
            console.log(error);

            return res.status(500).send({ message: "Internal Serve Error" })
        }
    }

}
const marksController = new MarksController()
module.exports = marksController
