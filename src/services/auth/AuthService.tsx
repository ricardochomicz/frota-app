import axios from 'axios';
import api from '../../Api';

const API_URL = 'http://localhost:5000';

interface UserData {
    name: string;
    email: string;
    password_hash: string;
}

interface Credentials {
    email: string;
    password_hash: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const AuthService = {
    async register(userData: UserData): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: 'Erro ao registrar usuário' };
        }
    },

    async login(credentials: Credentials): Promise<AuthResponse> {
        try {
            const response = await api.post("/login", credentials);
            console.log(response)
            const { token, user } = response.data;

            if (token) {
                this.setToken(token);
                this.setUser(user);
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: "Erro ao fazer login" };
        }
    },

    async getMe(): Promise<any> {
        try {
            const response = await api.get('/api/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,  // Adiciona o token no cabeçalho
                },
            });
            console.log(response)
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: "Erro ao obter dados do usuário" };
        }
    },

    setToken(token: string): void {
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getToken(): string | null {
        return localStorage.getItem("token");
    },

    setUser(user: any): void {
        localStorage.setItem("user", JSON.stringify(user));
    },

    getUser() {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    },

    removeToken(): void {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
    },

    removeUser() {
        localStorage.removeItem('user');
    },

    logout(): void {
        this.removeToken();
        window.location.href = "/login";
    },
};




