import axios from "axios";

export const API = import.meta.env.VITE_BACKEND_URL;

export const API_URL = axios.create({
    baseURL:API
});
