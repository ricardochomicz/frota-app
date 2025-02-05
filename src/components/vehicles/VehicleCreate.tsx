import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormVehicle from './_partials/FormVehicle';
import { vehicleSchema } from '../../validations/VehicleSchema';
import VehicleService from '../../services/VehicleService';
import { useAuth } from '../../context/AuthContext';
import { ToastService } from '../../services/common/ToastService';
import { IVehicle } from '../../interfaces/VehicleInterface';

function CreateVehicle() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IVehicle>({ resolver: yupResolver(vehicleSchema) });

    const onSubmit: SubmitHandler<IVehicle> = async (data) => {
        console.log(data)

        try {
            const res = await VehicleService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/vehicles');
        } catch (error: any) {
            console.log(error);
            ToastService.error(error.response?.data.error || 'Erro ao cadastrar o veículo');
        }
    };

    return (
        <FormVehicle
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            textForm="Cadastro de Veículo"
            isSubmitting={isSubmitting}
        />
    );
}

export default CreateVehicle;