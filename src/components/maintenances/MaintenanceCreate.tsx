import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormMaintenance from "./_partials/FormMaintenance"
import { ToastService } from '../../services/common/ToastService';
import { IMaintenance } from '../../interfaces/MaintenanceInterface';
import MaintenanceService from '../../services/MaintenanceService';
import { maintenanceSchema } from '../../validations/MaintenanceSchema';


const MaintenanceCreate = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IMaintenance>({ resolver: yupResolver(maintenanceSchema) });

    const onSubmit: SubmitHandler<IMaintenance> = async (data) => {
        console.log(data)
        try {
            const res = await MaintenanceService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/maintenances');
        } catch (error: any) {
            console.log(error.response?.data.details[0].message);
            ToastService.error(error.response?.data.details[0].message);
        }
    };
    return (
        <FormMaintenance
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            textForm="Nova Manutenção"
            isSubmitting={isSubmitting} />
    )
}

export default MaintenanceCreate