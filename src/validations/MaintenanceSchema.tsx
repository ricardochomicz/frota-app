import * as yup from 'yup';

export const maintenanceSchema = yup.object().shape({
    vehicle_id: yup.number().required('O veículo é obrigatório'),
    type: yup.string().required('Tipo de manutenção é obrigatória'),
    description: yup.string().required('Descrição é obrigatória'),
    mileage_at_maintenance: yup
        .number()
        .typeError('Informe somente números')
        .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
                return originalValue.trim() === "" ? undefined : value;
            }
            return value;
        })
        .required('Kilometragem é obrigatória'),
});
