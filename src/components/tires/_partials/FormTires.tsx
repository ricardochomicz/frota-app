import React from 'react';
import { Link } from 'react-router-dom';

function FormTires({ handleSubmit, buttonText, register, errors, textForm, handleStatusChange }) {

    function maskInput(valor, type) {
        let valorAlterado = valor.value;
        valorAlterado = valorAlterado.replace(/\D/g, ""); // Remove todos os não dígitos
        if (type === 'price') { // Adiciona pontos a cada três dígitos
            valorAlterado = valorAlterado.replace(/(\d+)(\d{2})$/, "$1.$2"); // Adiciona a parte de centavos
        } else {
            valorAlterado = valorAlterado.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
        valor.value = valorAlterado;
    }
    return (
        <div>
            <div className="max-w-lg mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {textForm}
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="col-span-12 sm:col-span-3">
                        <div>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código</label>
                            <input type="text" {...register('code')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="flex-1">
                            <div>
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Marca</label>
                                <input type="text" {...register('brand')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1">

                            <div>
                                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                                <input type="text" {...register('model')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="flex-1">
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                                <input type="text" onInput={(e) => maskInput(e.target, 'price')}

                                    {...register('price')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />

                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div>
                                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Durabilidade Aproximada (KM)</label>
                                <input type="number" {...register('durability_km')} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.durability_km && <p className="text-red-500 text-sm">{errors.durability_km.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" {...register('status')} onChange={(e) => handleStatusChange(e)} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Baixar Pneu</span>
                        </label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{buttonText}</button>
                    <Link to="/api/tires" className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</Link>
                </form>
            </div>
        </div>
    );
}

export default FormTires;
