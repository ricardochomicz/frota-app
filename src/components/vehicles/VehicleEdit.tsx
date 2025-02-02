import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import FormVehicle from './_partials/FormVehicle';
import VehicleService from '../../services/VehicleService';
import { vehicleSchema } from '../../validations/VehicleSchema';
import { ToastService } from '../../services/common/ToastService';
import { IVehicle } from '../../interfaces/VehicleInterface';

interface IVehicleResponse {
    data: IVehicle;
}

const VehicleEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IVehicle>({ resolver: yupResolver(vehicleSchema) });

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                if (!id) throw new Error('ID do veículo não encontrado');
                const response = await VehicleService.get(id);
                const data: IVehicle = response.data.data;
                console.log(data);

                setValue('brand', data.brand);
                setValue('model', data.model);
                setValue('year', data.year);
                setValue('license_plate', data.license_plate);
                setValue('mileage', data.mileage);
                setValue('fuel_type', data.fuel_type);
                setVehicle(data);
            } catch (error) {
                console.error(error);
                alert('Houve um erro ao carregar os dados do veículo');
            }
        };
        fetchVehicle();
    }, [id, setValue]);

    const onSubmit = async (data: IVehicle) => {
        try {
            if (!id) throw new Error('ID do veículo não encontrado');
            data.mileage = parseFloat(data.mileage.toString());
            const res = await VehicleService.update(id, data);
            console.log(res);
            ToastService.success(res.data.message);
            navigate('/api/vehicles');
        } catch (error: any) {
            ToastService.error(error?.response?.data?.error || 'Erro ao atualizar o veículo');
        }
    };

    return (
        <div>
            {vehicle ? (
                <FormVehicle
                    handleSubmit={handleSubmit(onSubmit)}
                    buttonText="Salvar"
                    register={register}
                    errors={errors}
                    textForm="Editar Veículo"
                    isSubmitting={isSubmitting}
                />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default VehicleEdit;
