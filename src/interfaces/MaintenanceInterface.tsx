export interface IMaintenance {
    id?: number;
    vehicle_id: number;
    user_id?: number;
    type: string;
    description: string;
    mileage_at_maintenance: number;
    date?: Date;
    created_at?: string;
    updated_at?: string;
}