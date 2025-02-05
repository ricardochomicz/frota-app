import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormMaintenance from "./_partials/FormMaintenance"
import { ToastService } from '../../services/common/ToastService';
import { IMaintenance } from '../../interfaces/MaintenanceInterface';
import MaintenanceService from '../../services/MaintenanceService';
import VehicleTiresService from '../../services/VehicleTiresService';
import { AuthService } from '../../services/auth/AuthService';
import moment from 'moment';


const MaintenanceCreate = () => {
    const [newTires, setNewTires] = useState([]);
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IMaintenance>();

    const handleVehicleIdChange = (id: number) => {
        console.log("ID do veículo selecionado:", id);
        setVehicleId(id);
    };

    const handleSaveNewTires = async (tires, maintenance_id) => {
        if (tires.length === 0) {
            console.log("Nenhum pneu para salvar.");
            return;
        }
        const tiresData = tires.map(tire => ({
            vehicle_id: vehicleId,
            tire_id: tire.id,
            user_id: AuthService.getUser().id,
            installation_date: moment(tire.installation_date).format('YYYY-MM-DD'),
            mileage_at_installation: tire.mileage_at_installation,
            predicted_replacement_mileage: tire.predicted_replacement_mileage,
            maintenance_id: maintenance_id
        }));

        await VehicleTiresService.create(tiresData);
    };

    const onSubmit: SubmitHandler<IMaintenance> = async (data) => {
        if (!vehicleId) {
            console.error("Veículo não selecionado");
            return;
        }

        const payload = {
            vehicle_id: vehicleId,
            user_id: AuthService.getUser().id,
            type: data.type,
            description: data.description,
            mileage_at_maintenance: data.mileage_at_maintenance,
        };

        console.log("Enviando manutenção:", payload);
        const res = await MaintenanceService.create(payload);
        console.log(res.data.data.id)

        // Chamar handleSaveNewTires com o ID da manutenção
        await handleSaveNewTires(newTires, res.data.data.id);

        ToastService.success(res.data.message);
        navigate('/api/maintenances');
    };



    return (
        <FormMaintenance
            handleSubmit={handleSubmit(onSubmit)}
            buttonText="Salvar"
            register={register}
            errors={errors}
            textForm="Nova Manutenção"
            isSubmitting={isSubmitting}
            onVehicleIdChange={handleVehicleIdChange}
            onNewTiresChange={setNewTires} // Passa a função para atualizar os novos pneus
        />
    );
}

export default MaintenanceCreate;