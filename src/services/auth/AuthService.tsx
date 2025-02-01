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

const AuthService = {
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
            const { token } = response.data;

            if (token) {
                this.setToken(token);
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: "Erro ao fazer login" };
        }
    },

    async getMe(): Promise<any> { // Substitua 'any' pelo tipo correto do usuário
        try {
            const response = await api.get("/me");
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

    removeToken(): void {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
    },

    logout(): void {
        this.removeToken();
        window.location.href = "/login";
    },
};

export default AuthService;
