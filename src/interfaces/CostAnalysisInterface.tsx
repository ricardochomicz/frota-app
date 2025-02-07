export interface ICostAnalysis {
    id?: number;
    vehicle_id: number;
    user_id?: number;
    vehicle_tire_id?: number;
    tire_id?: number;
    item_type: string;
    cost: any;
    purchase_date?: Date;
    performance_score: any;
    description: string;
    replacement_reason: string;
    mileage_driven?: number;
    date?: Date;
    created_at?: string;
    updated_at?: string;
}