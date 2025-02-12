import { z } from 'zod';

export const tiresSchema = z.object({
    code: z.string().min(3, { message: "Codigo obrigatório e o minímo de 3 caracteres" }),
    model: z.string().min(1, { message: "O modelo do pneu é obrigatório" }),
    brand: z.string().min(1, { message: "A marca do pneu é obrigatória" }),

    price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Preço do pneu obrigatório." }),

    durability_km: z
        .union([z.string().refine(val => !isNaN(Number(val)), { message: "Deve ser um número válido" }), z.number()])
        .transform(val => typeof val === 'string' ? Number(val) : val)
        .optional(),

});

