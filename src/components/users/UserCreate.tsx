import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormUser from './_partials/FormUser';
import { userSchema } from '../../validations/UserSchema';
import { ToastService } from '../../services/common/ToastService';
import { IUser } from '../../interfaces/UserInterface';
import UserService from '../../services/UserService';

const UserCreate = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IUser>({ resolver: yupResolver(userSchema) });

    const onSubmit: SubmitHandler<IUser> = async (data) => {
        console.log(data)
        try {
            const res = await UserService.create(data);

            ToastService.success(res.data.message);
            navigate('/api/users');
        } catch (error: any) {
            console.log(error.response?.data.details.message);
            ToastService.error(error.response?.data.details.message);
        }
    };

    return (
        <FormUser
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            textForm="Cadastro de Usuário"
            isCreate={true}
        />
    );
}

export default UserCreate;