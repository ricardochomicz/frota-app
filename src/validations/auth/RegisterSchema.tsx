import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string()
        .required('O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),

    email: yup.string()
        .required('Informe seu e-mail para continuar')
        .email('Digite um e-mail válido'),

    password_hash: yup.string()
        .required('Informe sua senha para continuar')
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
});
