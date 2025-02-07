import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VehicleToSelect from '../../vehicles/VehicleToSelect';
import VehicleTiresService from '../../../services/VehicleTiresService';
import TireItem from './TireItem';
import NewTireForm from './NewTireItem';
import { useForm } from 'react-hook-form';
import { ToastService } from '../../../services/common/ToastService';
import MaintenanceService from '../../../services/MaintenanceService';

const FormMaintenance = ({
    handleSubmit,
    buttonText,
    register,
    errors,
    isSubmitting,
    textForm,
    onNewTiresChange,
    onVehicleIdChange,
    defaultVehicleId,
    defaultMileage,
    tires,
    isCreate = true
}) => {

    const { setValue } = useForm()
    const { id } = useParams<{ id: string }>();
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const [mileage, setMileage] = useState<number | null>(defaultMileage || null);
    const [vtires, setTires] = useState(tires || []);
    const [newTires, setNewTires] = useState([{ code: '', brand: '', model: '' }]);
    const [showInputs, setShowInputs] = useState(false);
    const [status, setMaintenance] = useState<number | null>(null);


    const handleMileageChange = (newMileage: number) => {
        setMileage(newMileage);
        setValue('mileage', newMileage);
    };

    const result =

        useEffect(() => {
            if (id) {
                MaintenanceService.get(id)
                    .then(result => {
                        setMaintenance(result.data.data.status);
                    });
            }

            console.log("Pneus recebidos no FormMaintenance:", tires);
            if (vehicleId && Array.isArray(tires) && tires.length === 0) {
                VehicleTiresService.getTiresByVehicleId(vehicleId)
                    .then(result => {
                        setTires(result.data.data);
                    });
            }
        }, [vehicleId]);

    const handleAddNewTire = () => {
        setShowInputs(!showInputs);
        if (!showInputs) {
            const updatedNewTires = [...newTires, { code: '', brand: '', model: '' }];
            // setNewTires(updatedNewTires);
            onNewTiresChange(updatedNewTires); // Passa os novos pneus para o componente pai
        }
    };

    const handleTireChange = (index, field, value) => {
        const updatedTires = [...newTires];
        updatedTires[index][field] = value;
        setNewTires(updatedTires);
        onNewTiresChange(updatedTires); // Passa os novos pneus para o componente pai
    };

    const handleRemoveTire = async (index, isNew) => {
        if (isNew) {
            const updatedNewTires = newTires.filter((_, i) => i !== index);
            onNewTiresChange(updatedNewTires); // Passa os novos pneus para o componente pai
        } else {
            const tireToRemove = tires[index];
            if (tireToRemove && tireToRemove.id) {
                try {
                    const data = {
                        tire_id: tireToRemove.tire_id,
                        mileage_to_replace: mileage
                    }
                    await VehicleTiresService.removeTireToReplace(tireToRemove.id, data)

                    ToastService.success("Pneu removido com sucesso!");

                    // Após a remoção no banco, atualize o estado local
                    const updatedTires = tires.filter((_, i) => i !== index);
                    onNewTiresChange(updatedTires);
                } catch (error) {
                    console.error("Erro ao remover pneu:", error);
                }
            } else {
                console.error("Pneu não encontrado para remoção");
            }
        }
    };

    const handleVehicleSelect = (id) => {
        setVehicleId(id); // Atualiza o estado local
        setValue('vehicle_id', id);
        onVehicleIdChange(id); // Passa o vehicleId para o componente pai
    };

    return (
        <div>
            <div className="shadow-md sm:rounded-lg">
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
                                        <VehicleToSelect defaultVehicleId={defaultVehicleId}
                                            onSelect={(id) => {
                                                setValue('vehicle_id', id); // Atualiza o valor de vehicle_id no formulário
                                                handleVehicleSelect(id); // Atualiza o estado local também, caso precise
                                            }} onMileageChange={handleMileageChange} />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="mileage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">KM Atual</label>
                                        <input type="text" value={mileage}  {...register('mileage_at_maintenance')} name='mileage_at_maintenance' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        {errors.mileage_at_maintenance && <p className="text-red-500 text-sm">{errors.mileage_at_maintenance.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 sm:col-span-4">
                                        <div>
                                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                                            <input type="text" {...register('type')} name="type" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-span-12 sm:col-span-8">
                                        <div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                            <input type="text" {...register('description')} name="description" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {String(status) != 'CONCLUIDA' && (
                                        <button
                                            type="button"
                                            onClick={handleAddNewTire}
                                            className="px-4 py-3 mb-3 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Adicionar Novo Pneu
                                        </button>
                                    )}
                                    {(tires || []).map((tire, index) => (
                                        <TireItem key={index} tire={tire} index={index} onRemove={() => handleRemoveTire(index, false)} />
                                    ))}

                                    {showInputs && newTires.map((tire, index) => (
                                        <NewTireForm
                                            key={index}
                                            tire={tire}
                                            index={index}
                                            onChange={handleTireChange}
                                            onRemove={() => handleRemoveTire(index, true)}
                                        />
                                    ))}
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{buttonText}</button>
                                <Link to="/api/maintenances" className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Voltar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormMaintenance;
