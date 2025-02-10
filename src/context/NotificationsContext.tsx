import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationsContext = createContext({ notifications: [] });

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080"); // Ajuste a URL conforme necessário

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "tire_replacement") {
                    setNotifications((prev) => [...prev, data]);
                }
            } catch (error) {
                console.error("Erro ao processar notificação WebSocket:", error);
            }
        };

        return () => ws.close(); // Fechar conexão ao desmontar
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotifications deve ser usado dentro de um NotificationsProvider");
    }
    return context;
};
