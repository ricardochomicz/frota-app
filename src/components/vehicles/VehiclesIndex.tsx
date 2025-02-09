import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import VehicleService from "../../services/VehicleService";
import { ToastService } from "../../services/common/ToastService";
import { IVehicle } from "../../interfaces/VehicleInterface";
import { translateFuelType } from "../../helpers/Helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTachometerAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import { InputMask } from '@react-input/mask';
import VehicleUpdateMileage from './VehicleUpdateMileage'

const VehiclesIndex = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ license_plate: "", brand: "", model: "" });
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const limit = 5

    const fetchVehicles = async () => {
        setLoading(true)
        try {
            const response = await VehicleService.getAll(page, limit, filters);
            setVehicles(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError("Erro ao carregar os veículos");
            ToastService.error("Erro ao carregar veículos.");
        } finally {
            setLoading(false);
        }

    };
    useEffect(() => {
        fetchVehicles();
    }, [page, filters]);

    const handleDelete = async (vehicleId) => {
        try {
            await VehicleService.destroy(vehicleId)
            ToastService.success("Veículo excluído com sucesso!");
            await fetchVehicles()
        } catch (error) {
            ToastService.error("Erro ao excluir veículo!")
        }
    };

    const filterVehicles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const handleUpdateKm = (vehicleId: number) => {
        setIsDrawerOpen(true);
        setSelectedVehicleId(vehicleId);
    };

    const saveMileage = async (mileage: number) => {
        if (selectedVehicleId !== null) {
            console.log(`Salvar KM ${mileage} para o veículo ${selectedVehicleId}`);
            const data = {
                id: selectedVehicleId,
                mileage: mileage
            }
            try {
                await VehicleService.updateMileage(data);
                ToastService.success(`Km atualizado com sucesso.`);
            } catch (error) {
                ToastService.error(`Erro ao autualizar Km.`);
            }
        }
        setIsDrawerOpen(false);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    if (error) {
        return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Ops!</span> {error}
        </div>;
    }

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/api/vehicle/create" className=" w-auto mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Novo Veículo</Link>
                    <div className="flex gap-2 ml-auto">
                        <FontAwesomeIcon icon={faFilter} className="text-gray-500 mt-4" size="lg" />
                        <InputMask mask="___-____" replacement={{ _: /[A-Za-z0-9]/ }}
                            name="license_plate"
                            placeholder="Placa"
                            value={filters.license_plate} onChange={filterVehicles}
                            className="uppercase bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="brand"
                            placeholder="Marca"
                            value={filters.brand} onChange={filterVehicles}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="model"
                            placeholder="Modelo"
                            value={filters.model} onChange={filterVehicles}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

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
                                    Lista de Veículos

                                </caption>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Marca</th>
                                        <th scope="col" className="px-6 py-3">Modelo</th>
                                        <th scope="col" className="px-6 py-3 text-center">Ano</th>
                                        <th scope="col" className="px-6 py-3 text-center">Placa</th>
                                        <th scope="col" className="px-3 py-1 text-center">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map((vehicle) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={vehicle.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {vehicle.id}
                                            </th>
                                            <td className="px-6 py-4">{vehicle.brand}</td>
                                            <td className="px-6 py-4">
                                                {vehicle.model}<br />
                                                <small>{translateFuelType(vehicle.fuel_type)}</small>
                                            </td>
                                            <td className="px-6 py-4 text-center">{vehicle.year}</td>
                                            <td className="px-3 py-4 text-center">{vehicle.license_plate}</td>
                                            <td className="text-center">
                                                <Link to={`/api/vehicle/${vehicle.id}/edit`} data-text="Editar" className="tooltips text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                                <button type="button" onClick={() => handleDelete(vehicle.id)} data-text="Remover" className="tooltips text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <button type="button" onClick={() => handleUpdateKm(Number(vehicle.id))} data-text="Atualizar KM" className="tooltips text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">
                                                    <FontAwesomeIcon icon={faTachometerAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {selectedVehicleId !== null && (
                                <VehicleUpdateMileage
                                    vehicleId={selectedVehicleId}
                                    onSave={saveMileage}
                                    isOpen={isDrawerOpen}
                                    onClose={closeDrawer}
                                />
                            )}
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
        </div>
    );
};

export default VehiclesIndex;
