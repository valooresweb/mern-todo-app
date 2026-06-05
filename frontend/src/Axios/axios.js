import axios from "axios"
const instance = axios.create({
    baseURL:"http://172.31.13.167:8000/api"
})
export default instance 
