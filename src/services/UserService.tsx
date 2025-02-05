import api from "../Api";
import { useAuth } from "../context/AuthContext";
import { IUser } from "../interfaces/UserInterface";
import { AuthService } from "../services/auth/AuthService";


const UserService = {

    create(data: IUser) {
        const authUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!authUser || !authUser.id) {
            throw new Error('Usuário não autenticado');
        }
        if (data.role == 'user') {
            data.manager_id = Number(authUser.id);
        }
        return api.post('/api/users', data)
    },

    getAll(page: number, limit: number, filters: { name?: string; role?: string; }) {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            ...(filters.name ? { name: filters.name } : {}),
            ...(filters.role ? { role: filters.role } : {}),
        });

        return api.get(`/api/users?${params.toString()}`);
    },


    get(id) {
        return api.get(`/api/user/${id}`)
    },

    update(id, data) {
        if (data.role == 'admin') {
            data.manager_id = null;
        }
        return api.put(`/api/user/${id}/edit`, data)
    },

    destroy(id) {
        window.confirm('Tem certeza que deseja excluir esse usuário?')
        return api.delete(`/api/user/${id}/delete`)
    }
};

export default UserService