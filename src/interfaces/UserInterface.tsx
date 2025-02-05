export interface IUser {
    id?: number;
    name: string;
    email: string;
    role: string;
    manager_id?: number;
    password_hash?: string;
}
