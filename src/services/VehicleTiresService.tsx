import api from "../Api";

const VehicleTiresService = {

    create(data: any) {
        return api.post('/api/vehicle-tires', data);
    },

    get(id: number) {
        return api.get(`/api/vehicle-tires/${id}`)
    },

    getTiresByVehicle(vehicle_id: number) {
        return api.get(`/api/vehicle-tires/${vehicle_id}`)
    },

    addNewTires(vehicle_id: number, tires: any) {
        return api.post(`/api/vehicle-tires/${vehicle_id}`, tires)
    },

    async getTireInfoByCode(code: string) {
        return await api.get(`/api/tires-code/${code}`)
    },

    destroy(id) {
        return api.delete(`/api/vehicle-tires/${id}/delete`)
    }
}

export default VehicleTiresService