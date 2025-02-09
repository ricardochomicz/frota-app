import React, { useEffect, useState } from "react";
import VehicleService from "../../services/VehicleService";
import { useParams } from "react-router-dom";


const VehicleMaintenancesTires = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState([]);

    const fetchData = async () => {
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
        fetchData();
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
            <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">🔧 Histórico de Manutenções e Pneus</h2>

            <div className="space-y-6">
                {groupedData.map((maintenance) => (
                    <div key={maintenance.maintenance_id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-200 dark:border-gray-700">
                        {/* Cabeçalho da manutenção */}
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                🛠 Manutenção: {maintenance.maintenance_description || "Sem descrição"}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                📅 {maintenance.date ? new Date(maintenance.date).toLocaleDateString() : "Data não disponível"}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            🚗 Quilometragem na manutenção: <strong>{maintenance.mileage || "Não informada"} km</strong>
                        </p>

                        {/* Lista de Pneus Associados */}
                        {maintenance.tires.length > 0 ? (
                            <div className="mt-3">
                                <h4 className="text-md font-medium text-gray-600 dark:text-gray-300">🚛 Pneus Instalados:</h4>
                                <ul className="mt-2 space-y-2">
                                    {maintenance.tires.map((tire) => (
                                        <li key={tire.tire_id} className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow-sm">
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
