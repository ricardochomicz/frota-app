import { z } from 'zod';

export const tiresSchema = z.object({
    code: z.string({ message: 'O Codigo é obrigatório' }),
    brand: z.string({ message: 'A Marca é obrigatória' }),
    model: z.string({ message: 'O Modelo é obrigatório' }),
    price: z.string({ message: 'Preço é obrigatório' }),
    durability_km: z.string().min(0, 'A durabilidade deve ser maior que zero'),
})