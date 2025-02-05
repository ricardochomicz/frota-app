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

    const fetchVehicles = async () => {
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
            console.error("Erro ao buscar veículos:", error);
        }
    };
    useEffect(() => {
        fetchVehicles();
    }, [vehicleId]);

    useEffect(() => {
        if (defaultVehicleId) {
            const preselectedVehicle = vehicles.find(vehicle => vehicle.value === defaultVehicleId);
            setSelectedVehicle(preselectedVehicle || null);
        }
    }, [vehicleId, vehicles]);



    const handleVehicleChange = async (selected: VehicleOption | null) => {
        setSelectedVehicle(selected);

        if (selected) {
            // Chama o onSelect passando o ID do veículo
            onSelect(selected.value);

            // Fetch de detalhes do veículo selecionado para obter o mileage
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
                ? "rgb(31 41 55)" // Tailwind light gray
                : "rgb(55, 65, 81)",   // Tailwind dark gray (dark mode background)
            borderColor: state.isFocused ? "rgb(59 130 246)" : "rgb(31 41 55)", // Tailwind blue focus
            borderRadius: "0.375rem", // Tailwind rounded
            height: "3rem",
            padding: "0.5rem",
            minHeight: "3rem",
            boxShadow: "none",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "rgb(31 41 55)", // Dark background
            color: "white", // White text
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "rgb(59 130 246)" // Blue when selected
                : state.isFocused
                    ? "rgb(55 48 63)" // Lighter on hover
                    : "transparent",
            color: "white", // White text when selected
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "0.375rem",
        }),
        singleValue: (base) => ({
            ...base,
            color: "white", // White text
        }),
        placeholder: (base) => ({
            ...base,
            color: "rgb(209 213 219)", // Light gray placeholder text
        }),
        input: (base) => ({
            ...base,
            color: "white", // Texto digitado em branco
        }),
    };

    return (
        <Select
            classNamePrefix="custom-select"
            options={vehicles}
            onChange={handleVehicleChange}
            value={selectedVehicle}
            placeholder="Selecione um veículo..."
            styles={customStyles}
        />
    );
};

export default VehicleToSelect;
