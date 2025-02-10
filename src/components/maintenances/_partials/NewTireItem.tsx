import React, { useState } from 'react';
import VehicleTiresService from '../../../services/VehicleTiresService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlink } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../services/common/ToastService';

interface NewTireFormProps {
    tire: {
        id: string;
        code: string;
        brand: string;
        model: string;
        mileage_at_installation?: string;
    };
    index: number;
    onChange: (index: number, field: string, value: string) => void;
    onRemove: (index: number) => void;
}

const NewTireForm: React.FC<NewTireFormProps> = ({ tire, index, onChange, onRemove }) => {
    const [code, setCode] = useState(tire.code);
    const [id, setId] = useState(tire.id);
    const [showTires, setShowTires] = useState(false);

    const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    const searchTireCode = async () => {
        onChange(index, 'code', code);
        onChange(index, 'id', id);

        try {
            const response = await VehicleTiresService.getTireInfoByCode(code);
            const result = response.data;

            if (result.data) {
                onChange(index, 'id', result.data.id);
                onChange(index, 'mileage_at_installation', result.data.mileage_at_installation);
                onChange(index, 'predicted_replacement_mileage', result.data.predicted_replacement_mileage);
                onChange(index, 'brand', result.data.brand);
                onChange(index, 'model', result.data.model);
            }
        } catch (error) {
            console.error(error.response.data);
            ToastService.error(error.response.data.error);
            setCode("");
        }
    };



    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-2">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                    <input type="hidden" value={id} />
                    <div className="flex">
                        <input
                            type="text"
                            value={code}
                            onChange={codeChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={searchTireCode}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Pesquisar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-12 sm:col-span-3">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca/Modelo</label>
                    <input
                        type="text"
                        value={`${tire.brand} / ${tire.model}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readOnly
                    />
                </div>
            </div>
            <div className="col-span-12 sm:col-span-2">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km Instalação</label>
                    <input
                        type="text"
                        onChange={(e) => onChange(index, 'mileage_at_installation', e.target.value)} value={tire.mileage_at_installation}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="col-span-12 sm:col-span-2">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Km Indicada Substiuição</label>
                    <input type="text" value={tire.predicted_replacement_mileage} onChange={(e) => onChange(index, 'predicted_replacement_mileage', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
};

export default NewTireForm;
