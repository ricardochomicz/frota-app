import moment from "moment";

export const translateFuelType = (fuelType) => {
    const fuelTypeMap = {
        'gasoline': 'Gasolina',
        'diesel': 'Diesel',
        'electric': 'Elétrico',
        'hybrid': 'Flex'
    };
    return fuelTypeMap[fuelType] || fuelType;
};

export const translateStatusTires = (status) => {
    const statusTypeMap = {
        'available': 'Disponível',
        'in use': 'Em Uso',
        'lower': 'Baixado',
    };
    return statusTypeMap[status] || status;
};

export const replacementReason = (reason) => {
    const reasonTypeMap = {
        'defect': 'Defeito',
        'replace': 'Substituição',
        'reform': 'Recapagem',
        'repair': 'Reparo'
    };
    return reasonTypeMap[reason] || reason;
}

export const badgeStatus = (status) => {
    const badgeClasses = `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status === 'PENDENTE'
        ? 'bg-red-100 text-red-800'
        : 'bg-green-100 text-green-800'
        }`;

    return <span className={badgeClasses}>{status}</span>;
}

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
}

export const translateRoleUser = (role) => {
    const roleTypeMap = {
        'admin': 'Admin',
        'user': 'Usuário',
    };
    return roleTypeMap[role] || role;
};

export const maskMileage = (value) => {
    let val = value.toString();
    val = val.replace(/\D/g, ""); // Remove todos os não dígitos
    val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Adiciona pontos a cada três dígitos
}


export const handleInputChange = (e) => {
    let value = e.target.value.toUpperCase(); // Sempre em maiúsculas
    const regex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/; // Suporta "AAA9999" e "AAA9A99"

    if (regex.test(value) || value === '') {
        e.target.value = value;
    } else {
        e.target.value = value.slice(0, -1); // Remove último caractere inválido
    }
};

