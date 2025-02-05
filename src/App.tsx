import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/bootstrap/Navbar';
import usePace from './helpers/PaceJs';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  usePace();
  return (
    <AuthProvider>

      <Router>
        <NavBar />

        <ToastContainer />
        <div className="container mx-auto">
          <AppRoutes />
        </div>
      </Router>

    </AuthProvider>
  );
}

export default App;
