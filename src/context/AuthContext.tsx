import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo do usuário
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

// Tipando o valor do contexto
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // Permite que o provider tenha qualquer tipo de conteúdo como filho
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null); // Tipando o estado do usuário

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
