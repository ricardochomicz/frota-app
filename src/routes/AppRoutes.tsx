import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "../components/Home";
import Login from "../components/auth/Login";
// import Register from "../components/auth/Register";
import VehiclesIndex from "../components/vehicles/VehiclesIndex";
import VehicleCreate from "../components/vehicles/VehicleCreate";
import VehiclesEdit from "../components/vehicles/VehicleEdit";
import TiresIndex from "../components/tires/TiresIndex";
import TireCreate from "../components/tires/TireCreate";
import TireEdit from "../components/tires/TireEdit";

const AppRoutes: React.FC = () => {  // Tipagem explícita como React Functional Component
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/api/vehicles" element={<VehiclesIndex />} />
            <Route path="/api/vehicle/create" element={<VehicleCreate />} />
            <Route path="/api/vehicle/:id/edit" element={<VehiclesEdit />} />
            <Route path="/api/tires" element={<TiresIndex />} />
            <Route path="/api/tires/create" element={<TireCreate />} />
            <Route path="/api/tires/:id/edit" element={<TireEdit />} />
        </Routes>
    );
};

export default AppRoutes;
