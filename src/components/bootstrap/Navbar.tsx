import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import TiresService from '../../services/TiresService';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const { notifications, clearNotifications } = useNotifications();
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleVerifyTires = async () => {
        setLoading(true);
        clearNotifications();
        try {
            await TiresService.verifyTires();
        } catch (error) {
            console.error("Erro ao verificar pneus:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!authenticated) return null;

    return (
        <nav className="bg-white border-b border-gray-300 dark:bg-gray-900 w-full">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <Link to="/" className="flex items-center space-x-3">
                    <img src="../../../truck.png" className="h-8" alt="Logo" />
                    <span className="text-2xl font-semibold dark:text-white">Manutenção de Frota</span>
                </Link>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-gray-900 dark:text-white"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <div className={`lg:flex lg:items-center lg:space-x-6 ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-sm">
                        <li><Link to="/api/vehicles" className="hover:text-blue-500 dark:text-white">Veículos</Link></li>
                        <li><Link to="/api/tires" className="hover:text-blue-500 dark:text-white">Pneus</Link></li>
                        <li className="relative">
                            <Link to="/api/maintenances" className="hover:text-blue-500 dark:text-white">Manutenção</Link>
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-[10] bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {notifications.length}
                                </span>
                            )}
                        </li>
                        <li><Link to="/api/cost-analysis" className="hover:text-blue-500 dark:text-white">Análise de Custo</Link></li>
                        <li><Link to="/api/users" className="hover:text-blue-500 dark:text-white">Usuários</Link></li>
                        <li>
                            <button
                                onClick={handleVerifyTires}
                                className="hover:text-blue-500 dark:text-white flex items-center gap-2"
                                disabled={loading}
                            >
                                Verificar Pneus
                                {loading && (
                                    <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                                )}
                            </button>
                        </li>
                    </ul>
                    <button onClick={handleLogout} className="mt-4 lg:mt-0 text-blue-600 dark:text-blue-500 hover:underline">
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;