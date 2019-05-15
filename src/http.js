import axios from 'axios'

const http = axios.create({
    // accessible through .defaults.baseURL
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {

    }
})

export default http
