const { default: mongoose } = require("mongoose");

class StudentModel {
    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, required: true },
            std: { type: String, required: true },
        })

        this.Student = mongoose.model("tbl_Students", this.schema)
    }

    InsertStudent(data) {
        return this.Student.create(data)
    }

    GetStudent() {
        return this.Student.find({})
    }
}

const studentMdel = new StudentModel()
module.exports = studentMdel