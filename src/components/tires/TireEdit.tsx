import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import FormTires from './_partials/FormTires';
import TiresService from '../../services/TiresService';
import { tiresSchema } from '../../validations/TiresSchema';
import { ToastService } from '../../services/common/ToastService';
import { ITires } from '../../interfaces/TiresInterface';

interface ITiresResponse {
    data: ITires;
}

const TiresEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tires, setTires] = useState<ITires | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ITires>({ resolver: yupResolver(tiresSchema) });

    useEffect(() => {
        const fetchTires = async () => {
            try {
                if (!id) throw new Error('ID do veículo não encontrado');
                const response = await TiresService.get(id);
                const data: ITires = response.data.data;
                console.log(data);

                setValue('code', data.code);
                setValue('brand', data.brand);
                setValue('model', data.model);
                setValue('price', data.price);
                setTires(data);
            } catch (error) {
                console.error(error);
                alert('Houve um erro ao carregar os dados do pneu');
            }
        };
        fetchTires();
    }, [id, setValue]);

    const onSubmit = async (data: ITires) => {
        try {
            if (!id) throw new Error('ID do pneu não encontrado');
            const res = await TiresService.update(id, data);
            console.log(res);
            ToastService.success(res.data.message);
            navigate('/api/tires');
        } catch (error: any) {
            console.log(error);
            ToastService.error(error?.response?.data?.error || 'Erro ao atualizar o pneu');
        }
    };

    return (
        <div>
            {tires ? (
                <FormTires
                    handleSubmit={handleSubmit(onSubmit)}
                    buttonText="Salvar"
                    register={register}
                    errors={errors}
                    textForm="Editar Pneu"
                    isSubmitting={isSubmitting}
                />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default TiresEdit;
