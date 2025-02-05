import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string()
        .required('Informe seu e-mail para continuar')
        .email('Digite um e-mail válido'),
    role: yup.string().required('Papel de usuário é obrigatório'),
});
