import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY



const BASE_URL = apiUrl;
const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
})

// console.log(apiUrl);

export { axiosConfig }