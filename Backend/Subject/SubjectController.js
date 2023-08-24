const subjectModel = require("./SubjectModel")

class SubjetController {
    async AddSubject(req, res) {
        try {
            const { subject } = req.body
            if (!subject) return res.status(400).send({ message: "Missing Dipendency Subject" })
            const result = await subjectModel.InsertSubject(req.body)
            if (!result) return res.status(400).send({ message: "Somthing Went Wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            if (error && error.message.match('E11000')) {
                return res.status(400).send({ message: "This Subject Alredy Exists" })
            }
            return res.status(500).send({ message: "InternaL Server Error" })
        }
    }

    async GetSubject(req, res) {
        try {
            const result = await subjectModel.GetSubjects()
            if (result) return res.status(200).send({ message: "Success", subject: result })
            return res.status(400).send({ message: "Somthing Went Worong" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" })
        }

    }
}

const subjectController = new SubjetController()
module.exports = subjectController