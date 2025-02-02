
import { DatabaseSync } from "node:sqlite";
import api from "../Api";
import { IVehicle } from "../interfaces/VehicleInterface";
import { AuthService } from "../services/auth/AuthService";


const VehicleService = {
    create(data: IVehicle) {
        data.user_id = Number(AuthService.getUser());
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

    update(id, data) {
        return api.put(`/api/vehicles/${id}/edit`, data)
    }
};

export default VehicleService