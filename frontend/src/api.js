import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5233/api",
    withCredentials: true, // <- ESSENCIAL!
});

export default api;
