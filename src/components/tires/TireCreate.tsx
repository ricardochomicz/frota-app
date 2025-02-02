import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTires from './_partials/FormTires';
import { tiresSchema } from '../../validations/TiresSchema';
import TiresService from '../../services/TiresService';
import { useAuth } from '../../context/AuthContext';
import { ToastService } from '../../services/common/ToastService';
import { ITires } from '../../interfaces/TiresInterface';

const TireCreate = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ITires>({ resolver: yupResolver(tiresSchema) });

    const onSubmit: SubmitHandler<ITires> = async (data) => {
        console.log(data)
        try {
            const res = await TiresService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/tires');
        } catch (error: any) {
            console.log(error.response?.data.details[0].message);
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
            isSubmitting={isSubmitting}
        />
    );
}

export default TireCreate;