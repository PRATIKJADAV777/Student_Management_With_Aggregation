const { default: mongoose } = require("mongoose")

const DBConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Agregation")
        console.log("Data Base Connected")
    } catch (error) {
        console.log("DB Is Lost")
    }
}

module.exports = DBConnect