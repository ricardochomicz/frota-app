import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from "../../services/auth/AuthService";
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TiresService from '../../services/TiresService';
import { useNotifications } from '../../context/NotificationsContext';

const NavBar = () => {
    const { notifications, clearNotifications } = useNotifications();
    const hasNotifications = notifications.length > 0;
    const { authenticated, logout } = useAuth();
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    console.log('Notificações no Navbar:', notifications);

    const handleVerifyTires = async () => {
        setLoading(true); // Exibe o spinner
        clearNotifications(); // Limpa as notificações

        try {
            await TiresService.verifyTires(); // Chama o serviço
        } catch (error) {
            console.error("Erro ao verificar pneus:", error);
        } finally {
            setLoading(false); // Oculta o spinner ao finalizar
        }
    };


    const handleLogout = () => {
        logout();

        navigate("/login");
    };


    if (!authenticated) {
        return null; // Retorna null se o usuário não estiver autenticado (esconde a NavBar)
    }
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../../../truck.png" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Manutenção de Frota</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a href="#" onClick={handleLogout} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Sair</a>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700 mb-5">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to="/api/vehicles" className="text-gray-900 dark:text-white hover:underline">Veículos</Link>
                            </li>
                            <li>
                                <Link to="/api/tires" className="text-gray-900 dark:text-white hover:underline">Pneus</Link>
                            </li>
                            <li>
                                <Link to="/api/maintenances" className="text-gray-900 dark:text-white hover:underline">Manutenção</Link>
                                <span className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {notifications.length}
                                </span>

                            </li>
                            <li>
                                <Link to="/api/cost-analysis" className="text-gray-900 dark:text-white hover:underline">Análise de Custo</Link>
                            </li>
                            <li>
                                <Link to="/api/users" className="text-gray-900 dark:text-white hover:underline">Usuários</Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleVerifyTires}
                                    className="text-gray-900 dark:text-white hover:underline flex items-center gap-2"
                                    disabled={loading}
                                >
                                    Verificar Pneus
                                    {loading && (
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>

                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar