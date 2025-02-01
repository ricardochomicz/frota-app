import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import VehicleService from "../../services/VehicleService";
import { ToastService } from "../../services/common/ToastService";
import { IVehicle } from "../../interfaces/VehicleInterface";
import { translateFuelType } from "../../helpers/Helpers";

const VehiclesIndex = () => {
    // Tipando o estado com a interface IVehicle[]
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchVehicles = async () => {

            try {
                const response = await VehicleService.getAll();
                setVehicles(response.data.data);
            } catch (error) {
                setError("Erro ao carregar os veículos");
                ToastService.error("Erro ao carregar veículos.");
            } finally {
                setLoading(false); // Sempre execute isso após o processo
            }

        };
        fetchVehicles();
    }, []);

    if (error) {
        return <div>{error}</div>; // Exibe o erro se houver algum
    }

    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">

            {
                loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Ops!</span> {error}
                    </div>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            Lista de Veículos
                            <div className="flex">
                                <Link to="/api/vehicle/create" className=" w-auto mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Novo Veículo</Link>
                            </div>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">#</th>
                                <th scope="col" className="px-6 py-3">Marca</th>
                                <th scope="col" className="px-6 py-3">Modelo</th>
                                <th scope="col" className="px-6 py-3 text-center">Ano</th>
                                <th scope="col" className="px-6 py-3 text-center">Placa</th>
                                <th scope="col" className="px-6 py-3 text-center">...</th>
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
                                    <td className="px-6 py-4 text-center">{vehicle.license_plate}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link to={`/api/vehicle/${vehicle.id}/edit`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
};

export default VehiclesIndex;
