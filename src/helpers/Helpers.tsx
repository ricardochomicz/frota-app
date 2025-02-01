export const translateFuelType = (fuelType) => {
    const fuelTypeMap = {
        'gasoline': 'Gasolina',
        'diesel': 'Diesel',
        'electric': 'Elétrico',
        'hybrid': 'Flex'
    };
    return fuelTypeMap[fuelType] || fuelType;
};

export const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase(); // Sempre em maiúsculas
    const regex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/; // Suporta "AAA9999" e "AAA9A99"

    if (regex.test(value) || value === '') {
        e.target.value = value;
    } else {
        e.target.value = value.slice(0, -1); // Remove último caractere inválido
    }
};

