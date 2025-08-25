import axios from "axios";



export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5084"}/api`
});

api.interceptors.response.use(res => res.data, error => {
    throw error;
});