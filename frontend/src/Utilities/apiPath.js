import axios from "axios";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const API_URL = axios.create({
    baseURL: backendUrl,
})