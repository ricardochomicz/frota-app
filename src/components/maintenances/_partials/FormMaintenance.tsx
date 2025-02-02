import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VehicleToSelect from '../../vehicles/VehicleToSelect';

const FormMaintenance = ({ handleSubmit, buttonText, register, errors, isSubmitting, textForm }) => {
    const [vehicle, setVehicle] = useState(null);
    const [vehicleId, setVehicleId] = useState(null);
    const [mileage, setMileage] = useState<number | null>(null);

    const handleMileageChange = (newMileage: number) => {
        setMileage(newMileage);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 mt-10">
            <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {textForm}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-row space-x-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Placa do Veículo:</label>
                                    <VehicleToSelect onSelect={setVehicleId}
                                        onMileageChange={handleMileageChange}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="mileage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Atual</label>
                                    <input type="text" value={mileage ?? ""}  {...register('mileage')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                                <input type="text" {...register('code')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                                <input type="text" {...register('brand')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                                <input type="text" {...register('model')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                <input type="text" {...register('price')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>

                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{buttonText}</button>
                            <Link to="/api/tires" className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FormMaintenance;
