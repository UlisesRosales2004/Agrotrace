import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    withCredentials: false,
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Token expirado o no autorizado');
        } else if (error.response?.status === 500) {
            console.error('Error interno del servidor');
        } else if (error.code === 'ECONNABORTED') {
            console.error('Timeout - La petición tardó demasiado');
        }

        return Promise.reject(error);
    }
);

export default api;