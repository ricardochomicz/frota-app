import api from "../Api";
import { ITires } from "../interfaces/TiresInterface";
import { AuthService } from "../services/auth/AuthService";

const authUser = AuthService.getUser().id;

const TiresService = {

    create(data: ITires) {

        data.user_id = AuthService.getUser().id;
        data.price = parseFloat(data.price.replace(/[^0-9.,]/g, '').replace(',', '.')).toString();

        return api.post('/api/tires', data)
    },

    getAll(page: number, limit: number, filters: { code?: string; brand?: string; model?: string }) {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),

            ...(filters.code ? { code: filters.code } : {}),
            ...(filters.brand ? { brand: filters.brand } : {}),
            ...(filters.model ? { model: filters.model } : {}),


        });

        return api.get(`/api/tires?${params.toString()}`);
    },


    get(id) {
        return api.get(`/api/tires/${id}`)
    },

    update(id, data) {
        data.price = parseFloat(data.price.replace(/[^0-9.,]/g, '').replace(',', '.')).toString();
        return api.put(`/api/tires/${id}/edit`, data)
    },

    destroy(id) {
        window.confirm('Tem certeza que deseja excluir esse pneu?')
        return api.delete(`/api/tires/${id}/delete`)
    }
};

export default TiresService