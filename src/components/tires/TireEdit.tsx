import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
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
    const [status, setStatus] = useState('available');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ITires>({ resolver: zodResolver(tiresSchema) });

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
                setValue('durability_km', data.durability_km);
                setTires(data);
            } catch (error) {
                console.error(error);
                alert('Houve um erro ao carregar os dados do pneu');
            }
        };
        fetchTires();
    }, [id, setValue]);

    const handleStatusChange = (e) => {
        const isChecked = e.target.checked;
        const newStatus = isChecked ? 'lower' : (status === 'in use' ? 'in use' : 'available');
        setStatus(newStatus);
    }
    const onSubmit = async (data: ITires) => {
        console.log(data);
        try {
            if (!id) throw new Error('ID do pneu não encontrado');
            const updatedData = { ...data, status };
            const res = await TiresService.update(id, updatedData);
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
                    handleStatusChange={handleStatusChange}
                />
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default TiresEdit;
