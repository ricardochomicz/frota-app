import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AuthService from './services/auth/AuthService';

const api = axios.create({
    baseURL: "http://localhost:5000",
});

// Intercepta todas as requisições e adiciona o token automaticamente
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepta as respostas para verificar erros globais (como token expirado)
api.interceptors.response.use(
    (response) => {
        console.log("Resposta da API:", response.data); // Debug da resposta
        return response;
    },
    (error) => {
        console.error("Erro da API:", error);
        if (error.response?.status === 401) {
            AuthService.removeToken(); // Remove token inválido
            window.location.href = "/login"; // Redireciona para a página de login
        }
        return Promise.reject(error); // Retorna o erro caso contrário
    }
);

export default api;
