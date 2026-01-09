import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
};

export const modulesAPI = {
    getAllModules: async () => {
        const response = await api.get('/modules');
        return response.data;
    },
    getModuleById: async (id: string) => {
        const response = await api.get(`/modules/${id}`);
        return response.data;
    },
    getRecommendations: async () => {
        const response = await api.get('/recommendations');
        return response.data;
    }
};

export const recommendationsAPI = {
    getRecommendations: async () => {
        const response = await api.get('/recommendations');
        return response.data;
    }
};

export const chatAPI = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage: async (message: string, context: any = {}) => {
        // Assuming the backend has a /chat endpoint
        const response = await api.post('/chat', { message, context });
        return response.data;
    }
};

export default api;
