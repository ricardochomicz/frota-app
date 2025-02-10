import React, { createContext, useContext, useEffect, useState, useRef } from "react";

interface Notification {
    type: string;
    message: string;
    // Adicione outros campos conforme necessário
}

interface NotificationsContextType {
    notifications: Notification[];
    clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
    notifications: [],
    clearNotifications: () => { },
});

interface NotificationsProviderProps {
    children: React.ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:5000");

        ws.current.onopen = () => {
            console.log("Conexão WebSocket aberta");
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("data", data.type)

                if (data.type === "connection_success") {
                    console.log("Mensagem de conexão recebida.");
                } else if (data.type === "tire_warning") {
                    console.log("Mensagem de aviso de troca recebida.");
                    setNotifications((prev) => [...prev, data]);
                } else if (data.type === "tire_replacement") {
                    console.log("Mensagem de substituição de pneu recebida.");
                    setNotifications((prev) => [...prev, data]);
                }
            } catch (error) {
                console.error("Erro ao processar notificação WebSocket:", error);
            }
        };

        ws.current.onerror = (error) => {
            console.error("Erro no WebSocket:", error);
        };

        ws.current.onclose = () => {
            console.log("Conexão WebSocket fechada");
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <NotificationsContext.Provider value={{ notifications, clearNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    return context;
};