import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MaintenanceService from '../../services/MaintenanceService';
import FormMaintenance from './_partials/FormMaintenance';
import { IMaintenance } from '../../interfaces/MaintenanceInterface';
import { SubmitHandler, useForm } from 'react-hook-form';
import VehicleTiresService from '../../services/VehicleTiresService';
import { AuthService } from '../../services/auth/AuthService';
import moment from 'moment';
import { ToastService } from '../../services/common/ToastService';

const MaintenanceEdit = () => {
    const { id } = useParams<{ id: string }>(); // Pegue o ID da manutenção da URL
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const [tires, setTires] = useState([]);
    const [newTires, setNewTires] = useState([{ code: '', brand: '', model: '' }]);
    const [maintenances, setMaintenances] = useState<IMaintenance | null>(null);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IMaintenance>();


    useEffect(() => {
        const fetchMaintenance = async () => {
            if (!id) throw new Error('ID da manutenção não encontrado');
            const response = await MaintenanceService.get(id);

            const data: IMaintenance = response.data.data;
            setValue('type', data.type);
            setValue('description', data.description);
            setValue('vehicle_id', data.vehicle_id);
            setValue('mileage', data.mileage);
            setValue('mileage_at_maintenance', data.mileage)

            setVehicleId(data.vehicle_id);

            try {
                const tiresResponse = await VehicleTiresService.getVehicleTiresForMaintenance(data.vehicle_id, Number(id));
                console.log(tiresResponse)
                console.log("Pneus recebidos:", tiresResponse.data.data);
                setTires(tiresResponse.data.data);
            } catch (error) {
                console.error("Erro ao buscar pneus:", error);
            }

        }
        fetchMaintenance()
    }, [id, setValue]);


    const handleAddTiresChange = async (tires, maintenance_id) => {
        if (tires.length === 0) {
            console.log("Nenhum pneu para salvar.");
            return;
        }

        if (!vehicleId) {
            console.error("Veículo nao selecionado");
            return
        }
        const existingTires = await VehicleTiresService.getVehicleTiresForMaintenance(vehicleId, Number(id));

        console.log("Pneus já existentes:", existingTires);
        // Filtra pneus novos que não existem no banco
        const newTires = tires.filter(tire =>
            !existingTires.data.data.some(existingTire => existingTire.tire_id === tire.id)
        );

        const tiresData = newTires.map(tire => {
            if (!tire.id) {
                console.error("Erro: tire.id é indefinido");
                return null;
            }
            return {
                vehicle_id: vehicleId,
                tire_id: tire.id,
                user_id: Number(AuthService.getUser().id),
                installation_date: moment(tire.installation_date).format('YYYY-MM-DD'),
                mileage_at_installation: tire.mileage_at_installation,
                predicted_replacement_mileage: tire.predicted_replacement_mileage,
                maintenance_id: maintenance_id

            };
        }).filter(tire => tire !== null);

        console.log("Dados para salvar pneus:", tiresData);

        if (tiresData.length > 0) {
            await VehicleTiresService.create(tiresData);
        } else {
            console.log("Nenhum pneu novo para salvar.");
        }
    };

    const onSubmit: SubmitHandler<IMaintenance> = async (data) => {
        if (!vehicleId) {
            console.error("Veículo não selecionado");
            return;
        }
        const payload = {
            vehicle_id: vehicleId,
            user_id: Number(AuthService.getUser().id),
            type: data.type,
            description: data.description,
            mileage_at_maintenance: data.mileage_at_maintenance,
        };

        console.log("Enviando manutenção:", payload);
        try {
            const res = await MaintenanceService.update(id, payload);
            await handleAddTiresChange(newTires, id);
            ToastService.success(res.data.message);
            navigate('/api/maintenances');
        } catch (error) {
            console.error("Erro ao atualizar manutenção:", error);
            ToastService.error("Erro ao salvar manutenção.");
        }
    };



    // Função para passar os novos pneus para o componente pai
    const handleNewTiresChange = (updatedNewTires: any[]) => {
        setNewTires(updatedNewTires);
    };



    return (
        <FormMaintenance
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register} // Seu método de registrar os campos
            errors={{}} // Suas mensagens de erro
            isSubmitting={false}
            textForm="Editar Manutenção"
            onNewTiresChange={handleNewTiresChange}
            onVehicleIdChange={setVehicleId}// Preenchendo o formulário com os dados da manutenção
            defaultVehicleId={vehicleId}

            tires={tires || []}
        />
    );
};

export default MaintenanceEdit;
