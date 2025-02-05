import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaintenanceService from "../../services/MaintenanceService";
import { ToastService } from "../../services/common/ToastService";
import { IMaintenance } from "../../interfaces/MaintenanceInterface";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faFilter, faBroom } from '@fortawesome/free-solid-svg-icons';
import { InputMask } from '@react-input/mask';
import { format } from 'date-fns';


const MaintenancesIndex = () => {
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ type: "", startDate: "", endDate: "", license_plate: "" });
    const limit = 5

    const fetchMaintenances = async () => {
        // setLoading(true)
        try {
            const response = await MaintenanceService.getAll(page, limit, {
                ...filters,
                startDate: filters.startDate ? new Date(filters.startDate) : undefined,
                endDate: filters.endDate ? new Date(filters.endDate) : undefined,
            });
            setMaintenances(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError("Erro ao carregar as manuteções");
            ToastService.error("Erro ao carregar manutenções.");
        } finally {
            setLoading(false); // Sempre execute isso após o processo
        }

    };
    useEffect(() => {
        fetchMaintenances();
    }, [page, filters]);

    const handleDelete = async (maintenanceId) => {
        try {
            await MaintenanceService.destroy(maintenanceId)
            ToastService.success("Manuteção excluída com sucesso!");
            await fetchMaintenances()
        } catch (error) {
            ToastService.error("Erro ao excluir manuteção!")
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ type: "", startDate: "", endDate: "", license_plate: "" });
        setPage(1);
    };

    if (error) {
        return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Ops!</span> {error}
        </div>;
    }

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <div className="flex justify-between items-center mb-4">
                <Link to="/api/maintenances/create" className=" w-auto mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nova Manutenção</Link>
                <div className="flex gap-2 ml-auto">
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500 mt-4" size="lg" />
                    <input
                        type="text"
                        placeholder="Tipo"
                        name="type"
                        value={filters.type} onChange={handleFilterChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <InputMask mask="___-____" replacement={{ _: /[A-Za-z0-9]/ }}
                        name="license_plate"
                        placeholder="Placa"
                        value={filters.license_plate} onChange={handleFilterChange}
                        className="uppercase bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate} onChange={handleFilterChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate} onChange={handleFilterChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button onClick={clearFilters} type="submit" className="p-2.5 ms-1 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FontAwesomeIcon icon={faBroom} className="text-white" size="lg" />
                    </button>

                </div>
            </div>

            {
                loading ? (
                    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <span className="font-medium">Carregando....</span>
                    </div>
                ) : error ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Ops!</span> {error}
                    </div>
                ) : (
                    <div className="sm:rounded-lg w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Lista de Manutenções

                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">#</th>
                                    <th scope="col" className="px-6 py-3">Tipo</th>
                                    <th scope="col" className="px-6 py-3">Veículo</th>
                                    <th scope="col" className="px-6 py-3 text-center">KM Atual</th>
                                    <th scope="col" className="px-6 py-3 text-center">Lançado por</th>
                                    <th scope="col" className="px-6 py-3 text-center">Data</th>
                                    <th scope="col" className="px-6 py-3 text-center">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {maintenances.map((maintenance) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={maintenance.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {maintenance.id}
                                        </th>
                                        <td className="px-6 py-4">{maintenance.type}</td>
                                        <td className="px-6 py-4">
                                            {maintenance.vehicle.brand} - {maintenance.vehicle.model}<br />
                                            <small>{maintenance.vehicle.license_plate}</small>
                                        </td>
                                        <td className="px-6 py-4 text-center">{maintenance.mileage_at_maintenance} Km</td>
                                        <td className="px-6 py-4 text-center">{maintenance.data_user.name}</td>
                                        <td className="px-6 py-4 text-center">{format(maintenance.updated_at, "dd/MM/yyyy")}</td>
                                        <td className="px-6 py-4 text-center">
                                            <Link to={`/api/maintenances/${maintenance.id}/edit`} data-text="Editar" className="tooltips text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                            <button type="button" onClick={() => handleDelete(maintenance.id)} data-text="Excluir" className="tooltips text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            <div className="flex pt-2 pb-2">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Anterior
                </button>
                <span className="text-white ms-3 p-1">Página {page} de {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Próxima
                </button>
            </div>

        </div>
    );
};

export default MaintenancesIndex;
