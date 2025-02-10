import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faBell, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/Helpers';

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

const TireItem = ({ tire, index, tires, onRemove }) => {

    return (

        <div className="group flex gap-4">
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km Indicado Substiuição</label>
                    <input type="text" value={tire.predicted_replacement_mileage} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div className="col-span-12 sm:col-span-1">
                {!tire.to_replace ? (
                    <Link to={`/api/cost-analysis/maintenance/${tire.maintenance_id}/tire/${tire.tire_id}`}
                        state={{ mileage: tire.mileage_at_installation, vehicle_id: tire.vehicle_id, vehicle_tire_id: tire.id }}
                        data-text="Substituição e Análise de custos"
                        className="tooltips mt-7 px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        <FontAwesomeIcon icon={faRetweet} />
                    </Link>
                ) : null}
            </div>
            <div className="col-span-12 sm:col-span-2">
                {!tire.to_replace ? (
                    <div>
                        {Number(tire.needs_replacement) === 1 && (
                            <FontAwesomeIcon icon={faBell} size="xl" className="mt-10 text-yellow-500 animate-bounce me-2" title="Pneus para revisão!" />
                        )}
                    </div>
                ) : null}
                {tire.to_replace ? (
                    <div className="mt-10 text-sm text-yellow-800  rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800" role="alert">
                        <div>
                            <span className="font-medium">Pneu Substituído em {formatDate(tire.updated_at)}</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
};

export default TireItem;