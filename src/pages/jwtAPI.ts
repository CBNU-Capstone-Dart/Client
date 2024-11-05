//api요청시 자동으로 jwt토큰 포함 설정

import axios from 'axios';
import { useAuth } from './AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
    const { token } = useAuth();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
