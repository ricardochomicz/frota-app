import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string({ message: 'O nome é obrigatório' })
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),

    email: z.string({ message: 'Informe seu e-mail para continuar' })
        .email('Digite um e-mail válido'),

    password_hash: z.string({ message: 'Informe sua senha para continuar' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),

});
