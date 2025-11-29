import axios from "axios";

const api = axios.create({
    baseURL: 'https://unevangelic-timeous-angie.ngrok-free.dev',
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json',
    }
});
export default api;