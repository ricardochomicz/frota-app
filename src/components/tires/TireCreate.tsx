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
        formState: { errors },
    } = useForm<ITires>({ resolver: zodResolver(tiresSchema) });

    const onSubmit: SubmitHandler<ITires> = async (data) => {
        console.log(data)
        try {
            const res = await TiresService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/tires');
        } catch (error: any) {
            console.log(error);
            ToastService.error(error.response?.data.details[0].message);
        }
    };

    return (
        <FormTires
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            textForm="Cadastro de Pneu"
        />
    );
}

export default TireCreate;