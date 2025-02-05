import api from "../Api";
import { IVehicle } from "../interfaces/VehicleInterface";
import { AuthService } from "../services/auth/AuthService";


const VehicleService = {
    create(data: IVehicle) {
        const authUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authUser || !authUser.id) {
            throw new Error('Usuário não autenticado');
        }

        data.mileage = parseFloat(String(data.mileage));
        data.license_plate = data.license_plate.toUpperCase();
        return api.post('/api/vehicles', data)
    },

    getAll(page: number, limit: number, filters: { license_plate?: string; brand?: string; model?: string }) {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(filters.license_plate ? { license_plate: filters.license_plate } : {}),
            ...(filters.brand ? { brand: filters.brand } : {}),
            ...(filters.model ? { model: filters.model } : {})
        });

        return api.get(`/api/vehicles?${params.toString()}`);
    },

    get(id) {
        return api.get(`/api/vehicles/${id}`)
    },

    update(id: number, data) {
        return api.put(`/api/vehicles/${id}/edit`, data)
    },

    destroy(id) {
        window.confirm('Tem certeza que deseja excluir esse veículo?')
        return api.delete(`/api/vehicle/${id}/delete`)
    },

    getAllVehiclesToSelect() {
        return api.get(`/api/to-select`);
    },

    updateMileage(data) {
        return api.put(`/api/vehicles/mileage`, data)
    }
};

export default VehicleService