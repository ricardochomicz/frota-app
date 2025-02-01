import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string()
        .required('Informe seu e-mail para continuar')
        .email('Digite um e-mail válido'),

    password_hash: yup.string()
        .required('Informe sua senha para continuar')
        .min(6, 'A senha deve ter pelo menos 6 caracteres')

});
