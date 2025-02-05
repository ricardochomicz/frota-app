import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VehiclesIndex from "../components/vehicles/VehiclesIndex";
import VehicleCreate from "../components/vehicles/VehicleCreate";
import VehiclesEdit from "../components/vehicles/VehicleEdit";
import TiresIndex from "../components/tires/TiresIndex";
import TireCreate from "../components/tires/TireCreate";
import TireEdit from "../components/tires/TireEdit";
import MaintenancesIndex from "../components/maintenances/MaintenancesIndex";
import MaintenanceCreate from "../components/maintenances/MaintenanceCreate";
import MaintenanceEdit from "../components/maintenances/MaintenanceEdit";
import UsersIndex from "../components/users/UserIndex";
import UserCreate from "../components/users/UserCreate";
import UserEdit from "../components/users/UserEdit";

const AppRoutes: React.FC = () => {  // Tipagem explícita como React Functional Component
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/api/vehicles" element={<VehiclesIndex />} />
            <Route path="/api/vehicle/create" element={<VehicleCreate />} />
            <Route path="/api/vehicle/:id/edit" element={<VehiclesEdit />} />
            <Route path="/api/tires" element={<TiresIndex />} />
            <Route path="/api/tires/create" element={<TireCreate />} />
            <Route path="/api/tires/:id/edit" element={<TireEdit />} />
            <Route path="/api/maintenances" element={<MaintenancesIndex />} />
            <Route path="/api/maintenances/create" element={<MaintenanceCreate />} />
            <Route path="/api/maintenances/:id/edit" element={<MaintenanceEdit />} />
            <Route path="/api/users" element={<UsersIndex />} />
            <Route path="/api/user/create" element={<UserCreate />} />
            <Route path="/api/user/:id/edit" element={<UserEdit />} />
        </Routes>
    );
};

export default AppRoutes;
