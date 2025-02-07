import { get } from "http";
import api from "../Api";
import { ICostAnalysis } from "../interfaces/CostAnalysisInterface";


const CostAnalysisService = {
    create(data: ICostAnalysis) {
        data.item_type = 'PNEU';
        return api.post('/api/cost-analysis', data)
    },

    getAll(page: number, limit: number, filters: { replacement_reason?: string; }) {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(filters.replacement_reason ? { replacement_reason: filters.replacement_reason } : {}),
        });
        return api.get(`/api/cost-analysis?${params.toString()}`);
    },

    get(id: number) {
        return api.get(`/api/cost-analysis/${id}`)
    },

    update(id: number, data) {
        return api.put(`/api/cost-analysis/${id}/edit`, data)
    },

    destroy(id) {
        return api.delete(`/api/cost-analysis/${id}/delete`)
    }
}

export default CostAnalysisService;