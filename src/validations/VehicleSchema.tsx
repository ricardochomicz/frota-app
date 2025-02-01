import * as yup from 'yup';

export const vehicleSchema = yup.object().shape({
    brand: yup.string().required('Marca é obrigatória'),
    model: yup.string().required('Modelo é obrigatório'),
    year: yup
        .number()
        .typeError('Informe somente números')
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                return originalValue.trim() === "" ? undefined : value;
            }
            return value;
        })
        .min(1900, 'Ano de Fabricação deve ser pelo menos 1900')
        .max(2099, 'Ano de Fabricação deve ser no máximo 2099')
        .required('Ano de Fabricação é obrigatório'),
    license_plate: yup.string().required('Placa é obrigatória'),
    mileage: yup
        .number()
        .typeError('Informe somente números')
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                return originalValue.trim() === "" ? undefined : value;
            }
            return value;
        })
        .required('Kilometragem é obrigatória'),
    fuel_type: yup
        .string()
        .trim()
        .oneOf(['diesel', 'electric', 'hybrid', 'gasoline'], 'Combustível é obrigatório')
        .required('Combustível é obrigatório'),
});
