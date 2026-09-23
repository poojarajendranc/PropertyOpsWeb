import axios from "axios";
import { getToken, removeToken } from "./authStorage";

const api = axios.create({
    baseURL:"http://localhost:5000/api"
})

api.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status === 401) {
        removeToken();
        if(!window.location.pathname.startsWith("/login")) {
            window.location.replace("/login");
        }
    }
    return Promise.reject(error);
})

export default api;