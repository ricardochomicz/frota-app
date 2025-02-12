import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


// Definindo o tipo do usuário
interface User {
    id?: string;
    name: string;
    email: string;
    role?: string;
    password_hash?: string;
    token?: string;
}

// Tipando o valor do contexto
interface AuthContextType {
    user: User | null;
    registro: (userData: User) => void;
    login: (userData: User) => void;
    logout: () => void;
    authenticated: boolean;
}

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // Permite que o provider tenha qualquer tipo de conteúdo como filho
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null); // Tipando o estado do usuário
    const [authenticated, setIsAuthenticated] = useState<boolean>(false);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedToken) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);  // Carrega o usuário do localStorage
            setIsAuthenticated(true);
            console.log(!parsedUser.token)
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData)); // Armazenando o usuário no localStorage
    };

    const registro = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token || '');  // Armazenando o usuário no localStorage
    };



    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };



    return (
        <AuthContext.Provider value={{ user, registro, login, logout, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para consumir o contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
