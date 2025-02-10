import React, { useEffect, useState } from "react";
import Select from "react-select";
import VehicleService from "../../services/VehicleService";

interface VehicleOption {
    value: number;
    label: string;
}

interface Props {
    onSelect: (vehicleId: number) => void;
    onMileageChange: (mileage: number) => void;
    vehicleId?: number;
    defaultVehicleId?: number;
}

const VehicleToSelect: React.FC<Props> = ({ onSelect, onMileageChange, vehicleId, defaultVehicleId }) => {
    const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(null);

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const response = await VehicleService.getAllVehiclesToSelect();
                if (response) {
                    const options = response.data.map((vehicle: any) => ({
                        value: vehicle.id,
                        label: `${vehicle.license_plate} - ${vehicle.brand} ( ${vehicle.model} )`,
                    }));
                    setVehicles(options);

                    const preselectedVehicle = options.find(vehicle => vehicle.value === vehicleId);
                    setSelectedVehicle(preselectedVehicle || null);
                }
            } catch (error) {
                console.log("Erro ao buscar veículos:", error);
            }
        };

        getVehicles();
    }, [vehicleId]);

    useEffect(() => {
        if (defaultVehicleId) {
            const preselectedVehicle = vehicles.find(vehicle => vehicle.value === defaultVehicleId);
            setSelectedVehicle(preselectedVehicle || null);
        }
    }, [vehicleId, vehicles]);


    const vehicleChange = async (selected: VehicleOption | null) => {
        setSelectedVehicle(selected);

        if (selected) {
            // Chama o onSelect passando o ID do veículo
            onSelect(selected.value);

            // Detalhes do veículo selecionado para obter o mileage
            const vehicleDetails = await VehicleService.get(selected.value);
            console.log(vehicleDetails)

            // Chama o onMileageChange passando o mileage do veículo
            if (vehicleDetails?.data.data.mileage) {
                onMileageChange(vehicleDetails.data.data.mileage);
            }
        }
    };

    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? "rgb(31 41 55)"
                : "rgb(55, 65, 81)",
            borderColor: state.isFocused ? "rgb(59 130 246)" : "rgb(31 41 55)",
            borderRadius: "0.375rem",
            height: "3rem",
            padding: "0.5rem",
            minHeight: "3rem",
            boxShadow: "none",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "rgb(31 41 55)",
            color: "white",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "rgb(59 130 246)"
                : state.isFocused
                    ? "rgb(55 48 63)"
                    : "transparent",
            color: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "0.375rem",
        }),
        singleValue: (base) => ({
            ...base,
            color: "white",
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgb(209 213 219)",
        }),
        input: (base) => ({
            ...base,
            color: "white",
        }),
    };

    return (
        <Select
            classNamePrefix="custom-select"
            options={vehicles}
            onChange={vehicleChange}
            value={selectedVehicle}
            placeholder="Selecione um veículo..."
            styles={customStyles}
        />
    );
};

export default VehicleToSelect;
