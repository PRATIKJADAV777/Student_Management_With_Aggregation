import axios from "axios"
class ApiHelper {
    constructor() { this.URl = "http://localhost:5500" }

    FetchData(id) {
        return axios.get(`${this.URl}/marks/${id}`)
    }

    GetStudent() {
        return axios.get(`${this.URl}/getstudent`)
    }

    AddStudent(data) {
        return axios.post(`${this.URl}/student`, data)
    }

    AddSubject(data) {
        return axios.post(`${this.URl}/subject`, data)
    }

    GetSubject(){
        return axios.get(`${this.URl}/getsubject`)
    }
    Addmarks(data){
        return axios.post(`${this.URl}/marks`,data)
    }

}
const apiHelper = new ApiHelper()
export default apiHelper