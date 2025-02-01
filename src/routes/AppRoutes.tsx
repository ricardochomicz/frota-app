import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../components/Home";
import Login from "../components/auth/Login";
// import Register from "../components/auth/Register";
import VehiclesIndex from "../components/vehicles/VehiclesIndex";
import VehicleCreate from "../components/vehicles/VehicleCreate";
import VehiclesEdit from "../components/vehicles/VehicleEdit";

const AppRoutes: React.FC = () => {  // Tipagem explícita como React Functional Component
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/api/vehicles" element={<VehiclesIndex />} />
            <Route path="/api/vehicle/create" element={<VehicleCreate />} />
            <Route path="/api/vehicle/:id/edit" element={<VehiclesEdit />} />
        </Routes>
    );
};

export default AppRoutes;
