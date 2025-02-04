import api from "../Api";
import { IMaintenance } from "../interfaces/MaintenanceInterface";
import { AuthService } from "../services/auth/AuthService";


const MaintenanceService = {
    create(data: IMaintenance) {

        data.user_id = AuthService.getUser().id;

        return api.post('/api/maintenances', data)
    },

    getAll(page: number, limit: number, filters: { type?: string; startDate?: Date; endDate?: Date; license_plate?: string }) {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(filters.type ? { type: filters.type } : {}),
            ...(filters.startDate ? { startDate: filters.startDate.toISOString() } : {}),
            ...(filters.endDate ? { endDate: filters.endDate.toISOString() } : {}),
            ...(filters.license_plate ? { license_plate: filters.license_plate } : {}),
        });

        return api.get(`/api/maintenances?${params.toString()}`);
    },


    get(id) {
        return api.get(`/api/maintenances/${id}`)
    },

    update(id, data) {
        return api.put(`/api/maintenances/${id}/edit`, data)
    },

    destroy(id) {
        window.confirm('Tem certeza que deseja excluir essa manutenção?')
        return api.delete(`/api/maintenances/${id}/delete`)
    }
};

export default MaintenanceService