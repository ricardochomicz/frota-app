import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTires from './_partials/FormTires';
import { tiresSchema } from '../../validations/TiresSchema';
import TiresService from '../../services/TiresService';
import { ToastService } from '../../services/common/ToastService';
import { ITires } from '../../interfaces/TiresInterface';

const TireCreate = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ITires>({ resolver: zodResolver(tiresSchema) });

    const onSubmit: SubmitHandler<ITires> = async (data) => {
        console.log(data)
        try {
            data.durability_km = Number(data.durability_km);
            const res = await TiresService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/tires');
        } catch (error: any) {
            console.log(error.response.data.error);
            ToastService.error(error.response.data.error);
        }
    };

    return (
        <FormTires
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            textForm="Cadastro de Pneu"
            handleStatusChange={() => { }}
            isCreate={false}
        />
    );
}

export default TireCreate;