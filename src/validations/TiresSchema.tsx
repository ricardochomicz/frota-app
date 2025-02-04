import * as yup from 'yup';

export const tiresSchema = yup.object().shape({
    code: yup.string().required('Código é obrigatório'),
    brand: yup.string().required('Marca é obrigatória'),
    model: yup.string().required('Modelo é obrigatório'),
    price: yup
        .string()
        .required('Preço é obrigatório'),
});
