import axios from 'axios';

const backendIp = import.meta.env.SERVER_IP;

const axiosInstance = axios.create({
    baseURL: `${backendIp}:8080/`,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;