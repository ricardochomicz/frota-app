import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import FormUser from './_partials/FormUser';
import UserService from '../../services/UserService';
import { userSchema } from '../../validations/UserSchema';
import { ToastService } from '../../services/common/ToastService';
import { IUser } from '../../interfaces/UserInterface';

interface IUserResponse {
    data: IUser;
}

const UserEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IUser>({ resolver: yupResolver(userSchema) });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!id) throw new Error('ID do usuário não encontrado');
                const response = await UserService.get(id);
                const data: IUser = response.data.data;

                setValue('name', data.name);
                setValue('email', data.email);
                setValue('role', data.role);
                setUser(data);
            } catch (error) {
                console.error(error);
                ToastService.error('Houve um erro ao carregar os dados do usuário');
            }
        };
        fetchUser();
    }, [id, setValue]);

    const onSubmit = async (data: IUser) => {
        try {
            if (!id) throw new Error('ID do usuário não encontrado');
            const res = await UserService.update(id, data);
            ToastService.success(res.data.message);
            navigate('/api/users');
        } catch (error: any) {
            ToastService.error(error?.response?.data?.error || 'Erro ao atualizar o usuário');
        }
    };

    return (
        <div>
            {user ? (
                <FormUser
                    handleSubmit={handleSubmit(onSubmit)}
                    buttonText="Salvar"
                    register={register}
                    errors={errors}
                    textForm="Editar Usuário"
                    isCreate={false}
                />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default UserEdit;
