import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="h-screen">
        <Router>
          {/* <NavBar /> */}
          <ToastContainer />
          <AppRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
