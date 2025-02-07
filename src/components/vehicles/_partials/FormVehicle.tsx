import React from 'react';
import { Link } from 'react-router-dom';
// import { handleInputChange } from '../../../helpers/Helpers';
import { InputMask } from '@react-input/mask';


function FormVehicle({ handleSubmit, buttonText, register, errors, isSubmitting, textForm }) {
    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {textForm}
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                                <div className="flex flex-row space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ano de Fabricação</label>
                                        <input type="number" {...register('year')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="license_plate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Placa</label>
                                        <InputMask mask="___-____" replacement={{ _: /[A-Za-z0-9]/ }}
                                            {...register('license_plate')} className="uppercase bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />

                                        {errors.license_plate && <p className="text-red-500 text-sm">{errors.license_plate.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="mileage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kilometragem</label>
                                        <input type="text" {...register('mileage')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="fuel_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Combustível</label>
                                        <select id="fuel_type" {...register('fuel_type')} defaultValue="" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option defaultValue="" selected>Selecione</option>
                                            <option value="diesel">Diesel</option>
                                            <option value="electric">Elétrico</option>
                                            <option value="hybrid">Flex</option>
                                            <option value="gasoline">Gasolina</option>
                                        </select>
                                        {errors.fuel_type && <p className="text-red-500 text-sm">{errors.fuel_type.message}</p>}

                                    </div>
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{buttonText}</button>
                                <Link to="/api/vehicles" className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormVehicle;
