import React, { useState } from 'react';

interface VehicleUpdateMileageProps {
    vehicleId: number;
    onSave: (mileage: number) => void;
    isOpen: boolean
    onClose: () => void;
}

const VehicleUpdateMileage: React.FC<VehicleUpdateMileageProps> = ({ vehicleId, onSave, isOpen, onClose }) => {
    const [mileage, setMileage] = useState('');

    const saveNewMileage = () => {
        const mileageValue = parseInt(mileage, 10);
        if (!isNaN(mileageValue)) {
            onSave(mileageValue);
        }
    };

    return (
        <div>
            <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white w-80 dark:bg-gray-800`} aria-labelledby="drawer-right-label">
                <h5 id="drawer-right-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>Atualizar KM
                </h5>
                <button type="button" onClick={onClose} data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Informe a KM atual do veículo.</p>
                <div>
                    <label htmlFor="mileage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Atual</label>
                    <input
                        type="text"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <a href="#" onClick={saveNewMileage} className="block mt-3 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Salvar
                </a>
            </div>
        </div>
    );
};

export default VehicleUpdateMileage;
