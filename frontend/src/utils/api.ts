import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3654/"
})

export default api