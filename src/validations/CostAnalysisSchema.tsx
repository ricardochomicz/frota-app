import { z } from 'zod';

export const costAnalysisSchema = z.object({
    description: z.string({ message: 'A descrição é obrigatória' }).min(1, { message: 'Informe uma breve descrição' }),
    replacement_reason: z.string({ message: 'Selecione o motivo da substituição' }).min(1, { message: 'Selecione o motivo da substituição' }),
    mileage: z.string({ message: 'A kilometragem atual é obrigatória' }).min(1, { message: 'A kilometragem atual é obrigatória' }).optional(),
    cost: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Preço inválido. Use um formato numérico, ex: 1000 ou 1000.50" }),
    performance_score: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Score inválido. Use um formato numérico, ex: 1000 ou 1000.50" }),
    mileage_driven: z.number()
});