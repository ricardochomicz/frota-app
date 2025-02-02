export interface IVehicle {
    id?: number;
    brand: string;
    model: string;
    year: number;
    license_plate: string;
    mileage: number;
    fuel_type: any;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}