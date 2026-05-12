import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Ejercicios from './components/Ejercicios';
import Adicionales from './components/Adicionales';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';

// Componente para proteger la ruta del Dashboard
const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token || !user.esAdmin) {
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Ejercicios />
            <Adicionales />
            <Contact />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
