import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faBell, faExclamationTriangle, faRetweet, faUnlink } from '@fortawesome/free-solid-svg-icons';
import CostAnalysisCreate from '../../cost_analysis/CostAnalysisCreate';
import { Link } from 'react-router-dom';

interface TireItemProps {
    tire: {
        code: string;
        brand: string;
        model: string;
        mileage_at_maintenance?: string;
        predicted_replacement_mileage?: string;
    };
    vehicle_id: number;
    index: number;
    tires: any;
    onRemove: (index: number) => void;
}

const TireItem = ({ tire, index, tires, onRemove, register }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedTireId, setSelectedTireId] = useState<number | null>(null);
    const [mileage, setMileage] = useState<number | null>(null);

    const handleCostAnalysisTire = (tireId: number, mileage: number) => {

        setIsDrawerOpen(true);
        setSelectedTireId(tireId);
        setMileage(mileage);

    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index + 1} - Código</label>
                        <input type="text" value={tire.code} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-3">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index + 1} - Marca/Modelo</label>
                        <input type="text" value={`${tire.brand} / ${tire.model}`} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
                    </div>
                </div>
                {tire.mileage_at_maintenance}
                <div className="col-span-12 sm:col-span-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index + 1} - Km Manutenção</label>
                        <input type="text" value={tire.mileage_at_installation} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-2">
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km Substituição Prevista</label>
                        <input type="text" value={tire.predicted_replacement_mileage} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-1">
                    {!tire.to_replace ? (
                        <Link to={`/api/cost-analysis/maintenance/${tire.maintenance_id}/tire/${tire.tire_id}`}
                            state={{ mileage: tire.mileage_at_installation, vehicle_id: tire.vehicle_id, vehicle_tire_id: tire.id }}
                            data-text="Retirar Pneu"
                            className="tooltips mt-7 px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            <FontAwesomeIcon icon={faRetweet} />
                        </Link>
                    ) : null}
                </div>
                <div className="tooltips col-span-12 sm:col-span-1" data-text="Pneus para revisão!">
                    {Number(tire.needs_replacement) === 1 && (
                        <FontAwesomeIcon icon={faBell} size="xl" className="mt-10 text-yellow-500 animate-bounce me-2" title="Pneus para revisão!" />
                    )}
                </div>

                {tire.to_replace ? (
                    <div className="col-span-12 sm:col-span-2">
                        <div className="flex items-center p-2 mt-8 text-sm text-yellow-800  rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800" role="alert">
                            <div>
                                <span className="font-medium">Pneu Substituído.</span>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    )
};

export default TireItem;