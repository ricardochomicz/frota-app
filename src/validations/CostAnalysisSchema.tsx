import { z } from 'zod';

export const costAnalysisSchema = z.object({
    cost: z.string({ message: 'O custo por KM é obrigatório' }),
    performance_score: z.any({ message: 'Score de performance é obrigatório' }),
    description: z.string({ message: 'A descrição é obrigatória' }),
    replacement_reason: z.string({ message: 'O motivo é obrigatório' }),
    purchase_date: z.any({ message: 'A data de compra é obrigatória' }),
    mileage_driven: z.any({ message: 'A kilometragem rodada é obrigatória' }),
})