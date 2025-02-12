import * as z from 'zod';

export const loginSchema = z.object({

    email: z.string({ message: 'Informe seu e-mail para continuar' })
        .email('Digite um e-mail válido'),

    password_hash: z.string({ message: 'Informe sua senha para continuar' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),

});
