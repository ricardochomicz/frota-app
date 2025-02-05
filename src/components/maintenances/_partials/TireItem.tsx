import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faUnlink } from '@fortawesome/free-solid-svg-icons';

interface TireItemProps {
    tire: {
        code: string;
        brand: string;
        model: string;
        mileage_at_maintenance?: string;
        predicted_replacement_mileage?: string;
    };
    index: number;
    tires: any;
    onRemove: (index: number) => void;
}

const TireItem: React.FC<TireItemProps> = ({ tire, index, tires, onRemove }) => (
    <div className="grid grid-cols-12 gap-4">
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
                <input type="text" value={tire.mileage_at_installation} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
            </div>
        </div>
        <div className="col-span-12 sm:col-span-2">
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km Substituição Prevista</label>
                <input type="text" value={tire.predicted_replacement_mileage} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly />
            </div>
        </div>
        <div className="col-span-12 sm:col-span-1">
            <button
                type="button"
                data-text="Remover Pneu"
                onClick={() => onRemove(index)}
                className="tooltips mt-7 px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                <FontAwesomeIcon icon={faUnlink} />
            </button>
        </div>
    </div>
);

export default TireItem;