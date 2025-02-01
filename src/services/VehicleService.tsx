
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

    getAll() {
        return api.get("/api/vehicles")
    },

    get(id) {
        return api.get(`/api/vehicles/${id}`)
    },

    update(id, data) {
        return api.put(`/api/vehicles/${id}/edit`, data)
    }
};

export default VehicleService