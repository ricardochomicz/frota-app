import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/bootstrap/Navbar';
import usePace from './helpers/PaceJs';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationsProvider } from './context/NotificationsContext';

function App() {

  usePace();
  return (
    <AuthProvider>
      <NotificationsProvider>
        <Router>
          <ToastContainer />
          <NavBar />
          <div className="container mx-auto p-4">
            <AppRoutes />
          </div>
        </Router>
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;
