import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from "../../services/auth/AuthService";

const NavBar = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = AuthService.getUser();
        setUser(loggedUser);

        const handleStorageChange = () => {
            const loggedUser = AuthService.getUser();
            setUser(loggedUser);  // Atualiza o estado quando houver uma mudança no localStorage
        };

        window.addEventListener("storage", handleStorageChange);

        // Cleanup ao remover o event listener
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        AuthService.logout();  // Chama o método de logout
        setUser(null);  // Limpa o estado de usuário local
        navigate("/login");
    };

    if (user) {
        return (
            <div>
                <nav className="bg-white border-gray-200 dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="../../truck.png" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Manutenção de Frota</span>
                        </a>
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                            <a href="#" onClick={handleLogout} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Sair</a>
                        </div>
                    </div>
                </nav>
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                                <li>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <Link to="/api/vehicles" className="text-gray-900 dark:text-white hover:underline">Veículos</Link>
                                </li>
                                <li>
                                    <Link to="/api/tires" className="text-gray-900 dark:text-white hover:underline">Pneus</Link>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Manutenção</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Análise de Custo</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar