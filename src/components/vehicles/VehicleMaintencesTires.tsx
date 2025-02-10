import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";
import { useParams } from "react-router-dom";


const VehicleMaintenancesTires = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await VehicleService.vehicleMaintenancesAndTires(id)
                .then((res) => {
                    console.log(res)
                    setData(res.data.data)
                })
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
    useEffect(() => {
        getData();
    }, [id]);

    const groupedData = data.reduce((acc, item) => {
        const existingMaintenance = acc.find(m => m.maintenance_id === item.maintenance_id);
        if (existingMaintenance) {
            // Adiciona o pneu à manutenção existente
            existingMaintenance.tires.push({
                tire_id: item.tire_id,
                tire_brand: item.tire_brand,
                tire_model: item.tire_model,
                tire_code: item.tire_code
            });
        } else {
            // Cria uma nova entrada de manutenção
            acc.push({
                maintenance_id: item.maintenance_id,
                maintenance_description: item.maintenance_description,
                date: item.created_at,
                mileage: item.mileage_at_maintenance,
                tires: item.tire_id ? [{
                    tire_id: item.tire_id,
                    tire_brand: item.tire_brand,
                    tire_model: item.tire_model,
                    tire_code: item.tire_code
                }] : []
            });
        }
        return acc;
    }, []);


    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                🔧 Histórico de Manutenções e Pneus
            </h2>

            <div className="space-y-6">

                {groupedData.map((maintenance) => (
                    <div
                        key={maintenance.maintenance_id}
                        className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105 hover:shadow-lg"
                    >
                        {/* Cabeçalho da manutenção */}
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                🛠 Manutenção: {maintenance.maintenance_description || "Sem descrição"}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                📅 {maintenance.date ? new Date(maintenance.date).toLocaleDateString() : "Data não disponível"}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            🚗 Quilometragem na manutenção: <strong className="text-blue-500 dark:text-blue-400">{maintenance.mileage || "Não informada"} km</strong>
                        </p>

                        {/* Lista de Pneus Associados */}
                        {maintenance.tires.length > 0 ? (
                            <div className="mt-4">
                                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">🚛 Pneus Instalados:</h4>
                                <ul className="space-y-3">
                                    {maintenance.tires.map((tire) => (
                                        <li
                                            key={tire.tire_id}
                                            className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                                                🔹 ({tire.tire_code}) {tire.tire_brand} - {tire.tire_model}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhum pneu registrado nesta manutenção.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleMaintenancesTires;
