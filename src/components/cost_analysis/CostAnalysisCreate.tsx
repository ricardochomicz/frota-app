import React, { useEffect, useState } from 'react';
import TiresService from '../../services/TiresService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICostAnalysis } from '../../interfaces/CostAnalysisInterface';
import { costAnalysisSchema } from '../../validations/CostAnalysisSchema';
import { ToastService } from '../../services/common/ToastService';
import CostAnalysisService from '../../services/CostAnalysisService';
import VehicleTiresService from '../../services/VehicleTiresService';



const CostAnalysisCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { maintenance_id, tire_id } = useParams();
    const { mileage, vehicle_id, vehicle_tire_id } = location.state || {};

    const [tireInfo, setTireInfo] = useState({
        id: '',
        code: '',
        brand: '',
        purchase: '',
        price: '',
        durability_km: 0,
        created_at: ''
    });


    const [km, setKm] = useState<number | "">(""); // Quilometragem atual
    const [kmDrive, setKmDrive] = useState<number>(0); // Quilometragem rodada
    const [performanceScore, setPerformanceScore] = useState<number | null>(null);
    const [custoPorKm, setCustoPorKm] = useState<number | null>(null);
    const [mileageDriven, setMileageDriven] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ICostAnalysis>({ resolver: zodResolver(costAnalysisSchema) });


    const getTire = async (tire_id: number) => {
        if (!tire_id) return;
        try {
            const response = await TiresService.get(tire_id)
                .then(response => {
                    setTireInfo({
                        id: response.data.data.id,
                        code: `${response.data.data.code} - ${response.data.data.brand}`,
                        brand: response.data.data.brand,
                        purchase: moment(response.data.data.created_at).format('DD/MM/YYYY'),
                        price: response.data.data.price,
                        durability_km: response.data.data.durability_km,
                        created_at: response.data.data.created_at
                    });

                })
        } catch (error) {
            console.error("Erro ao buscar o pneu:", error);
        }
    }

    useEffect(() => {

        if (km !== "" && mileage !== undefined && tireInfo.durability_km) {
            const kmRodados = Number(km) - mileage; // Quilometragem rodada
            const kmPrevisto = tireInfo.durability_km; // Durabilidade do pneu
            const custoCompra = parseFloat(tireInfo.price); // Preço do pneu

            // Validar se os valores são válidos antes de calcular
            if (kmRodados > 0 && kmPrevisto > 0) {
                const score = ((kmRodados / kmPrevisto) * 100) / 10;
                const custoKm = kmRodados > 0 ? custoCompra / kmRodados : 0; // Evitar divisão por zero

                const date = moment(tireInfo.created_at).format('DD/MM/YYYY');

                setValue("cost", custoKm.toFixed(2));
                setValue('performance_score', score.toFixed(2));
                setValue('purchase_date', date);
                setValue('mileage_driven', kmRodados);
                setKmDrive(Number(km) - mileage);
                setPerformanceScore(score);
                setCustoPorKm(custoKm);
                setMileageDriven(kmRodados);
            } else {
                setPerformanceScore(0); // Caso os valores sejam inválidos, exibe 0
                setCustoPorKm(0); // Evitar Infinity, exibe 0
            }
        } else {
            setPerformanceScore(0); // Caso os valores sejam inválidos, exibe 0
            setCustoPorKm(0); // Evitar Infinity, exibe 0
        }

        getTire(Number(tire_id));

    }, [tire_id, km, mileage, tireInfo, kmDrive, setValue, vehicle_id, vehicle_tire_id]);


    const itemType = {
        defect: 'Defeito',
        replace: 'Substituição',
        reform: 'Recapagem',
        repair: 'Reparo'
    }

    const saveCost: SubmitHandler<ICostAnalysis> = async (data, e) => {
        try {
            data.tire_id = Number(tire_id);// Adicionar o ID do pneu
            data.vehicle_id = Number(vehicle_id);
            data.vehicle_tire_id = Number(vehicle_tire_id);
            const res = await CostAnalysisService.create(data);
            await VehicleTiresService.removeTireToReplace(Number(vehicle_tire_id), { mileage_to_replace: kmDrive });
            await TiresService.updateStatusAfterAnalysis(Number(tire_id), { replacement_reason: data.replacement_reason });
            ToastService.success(res.data.message);
            navigate(`/api/maintenances/${maintenance_id}/edit`);
        } catch (error: any) {
            console.log(error)
            // console.log(error.response?.data.details.message); 
            ToastService.error(error.response?.data.details.message);
        }

    };

    return (
        <div>
            <div className="bg-gray-50 dark:bg-gray-900 mt-5">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Cadastro de Custo
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(saveCost)}>
                                <div className="flex flex-row space-x-4">
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="tire" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Cod/Marca</label>
                                            <input
                                                type="text"
                                                value={tireInfo.code} readOnly
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="purchase_date" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Data Compra</label>
                                            <input
                                                type="text"
                                                {...register('purchase_date')}
                                                value={tireInfo.purchase}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="price" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Valor Compra</label>
                                            <input
                                                type="text"
                                                value={tireInfo.price} readOnly
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="replacement_reason" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Motivo Substituição</label>
                                    <select {...register("replacement_reason")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" selected>Selecione</option>
                                        {Object.keys(itemType).map(key => (
                                            <option key={key} value={key}>{itemType[key]}</option>
                                        ))}
                                    </select>
                                    {errors.replacement_reason && <p className="text-red-500 text-sm">{errors.replacement_reason.message}</p>}
                                </div>
                                <div className="flex flex-row space-x-4 mt-2">
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Atual</label>
                                            <input
                                                type="number"
                                                onChange={(e) => setKm(e.target.value ? Number(e.target.value) : "")}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    {errors.replacement_reason && <p className="text-red-500 text-sm">{errors.replacement_reason.message}</p>}
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="mileage_at_installation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Instalação</label>
                                            <input
                                                type="text"
                                                value={mileage}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label htmlFor="mileage_driven" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Rodados</label>
                                            <input
                                                type="text"
                                                {...register("mileage_driven")}
                                                value={kmDrive}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row space-x-4 mt-2">
                                    <div className="flex-1">
                                        <label htmlFor="performance_score" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Score</label>
                                        <input
                                            type="text"
                                            {...register("performance_score")}
                                            value={performanceScore !== null ? performanceScore.toFixed(2) : ""}
                                            readOnly
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Custo por KM</label>
                                        <input
                                            type="text"
                                            {...register("cost")}
                                            name='cost'
                                            value={custoPorKm !== null ? custoPorKm.toFixed(2) : ""}
                                            readOnly
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Observação</label>
                                    <textarea
                                        id="description"
                                        {...register("description")}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Observação" />
                                </div>

                                <button type="submit" className="items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Salvar
                                </button>
                                <Link to={`/api/maintenances/${maintenance_id}/edit`} className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostAnalysisCreate;
