// CreateVehicle.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import VehicleService from '../../services/VehicleService';
import { ToastService } from '../../services/common/ToastService';
import VehicleCreate from '../../components/vehicles/VehicleCreate';
import CreateVehicle from '../../components/vehicles/VehicleCreate';

// Mock dos serviços
jest.mock('../../services/VehicleService');
jest.mock('../../services/common/ToastService');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('CreateVehicle Component', () => {
    it('should render the form', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <VehicleCreate />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText('Cadastro de Veículo')).toBeInTheDocument();
        expect(screen.getByText('Salvar')).toBeInTheDocument();
    });

    it('should submit the form and show success message', async () => {
        (VehicleService.create as jest.Mock).mockResolvedValue({ data: { message: 'Veículo cadastrado com sucesso!' } });

        render(
            <AuthProvider>
                <MemoryRouter>
                    <CreateVehicle />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Nome do Veículo/i), { target: { value: 'Veículo Teste' } });
        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(VehicleService.create).toHaveBeenCalled();
            expect(ToastService.success).toHaveBeenCalledWith('Veículo cadastrado com sucesso!');
            expect(mockNavigate).toHaveBeenCalledWith('/api/vehicles');
        });
    });

    it('should show error message on submission failure', async () => {
        (VehicleService.create as jest.Mock).mockRejectedValue({ response: { data: { error: 'Erro ao cadastrar o veículo' } } });

        render(
            <AuthProvider>
                <MemoryRouter>
                    <CreateVehicle />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Nome do Veículo/i), { target: { value: 'Veículo Teste' } });
        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(VehicleService.create).toHaveBeenCalled();
            expect(ToastService.error).toHaveBeenCalledWith('Erro ao cadastrar o veículo');
        });
    });
});
