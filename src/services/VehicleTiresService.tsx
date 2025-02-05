import api from "../Api";

const VehicleTiresService = {

    create(data: any) {
        return api.post('/api/vehicle-tires', data);
    },

    get(id: number) {
        return api.get(`/api/vehicle-tires/${id}`)
    },

    getTiresByVehicleId(vehicle_id: number) {
        return api.get(`/api/vehicle-tires/${vehicle_id}`)
    },

    getVehicleTiresForMaintenance(vehicle_id: number, maintenance_id: number) {
        return api.get(`/api/vehicle-tires/${vehicle_id}/maintenance/${maintenance_id}/tires`)
    },

    addNewTires(vehicle_id: number, tires: any) {
        return api.post(`/api/vehicle-tires/${vehicle_id}`, tires)
    },

    async getTireInfoByCode(code: string) {
        return await api.get(`/api/tires-code/${code}`)
    },

    destroy(id) {
        return api.delete(`/api/vehicle-tires/${id}/delete`)
    },

    removeTireToReplace(id: number, data) {
        return api.put(`/api/vehicle-tires/${id}/remove-to-replace`, data);
    }
}

export default VehicleTiresService