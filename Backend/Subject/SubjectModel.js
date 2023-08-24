const { default: mongoose } = require("mongoose");

class SubjectModel {
    constructor() {
        this.schema = new mongoose.Schema({
            subject: { type: String, required: true, unique: true }
        })

        this.Subject = mongoose.model("tbl_Subjects", this.schema)
    }
    InsertSubject(data) {
        return this.Subject.create(data)
    }
    GetSubjects(){
        return this.Subject.find()
    }
}

const subjectModel = new SubjectModel()
module.exports = subjectModel
