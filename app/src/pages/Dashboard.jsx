import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDumbbell, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import Rutinas from '../components/Rutinas';
import Usuarios from '../components/Usuarios';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('rutinas');
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="container" style={{ minHeight: '80vh', padding: '40px 0' }}>
            <section className="heading d-flex justify-content-between align-items-center mb-5">
                <div className="text-start">
                    <h1 style={{ color: '#EC652B', fontSize: '2.5rem', fontWeight: 'bold' }}>Panel de Administración</h1>
                    <p className="mb-0">Gestiona el contenido principal de GymBuddy</p>
                </div>
                <button className="btn btn-outline-danger" onClick={onLogout}>
                    <FaSignOutAlt className="me-2" /> Cerrar Sesión
                </button>
            </section>

            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn ${activeTab === 'rutinas' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    style={{ backgroundColor: activeTab === 'rutinas' ? '#EC652B' : 'transparent', borderColor: '#EC652B', color: activeTab === 'rutinas' ? '#fff' : '#EC652B' }}
                    onClick={() => setActiveTab('rutinas')}
                >
                    <FaDumbbell className="me-2" /> Rutinas
                </button>
                <button
                    className={`btn ${activeTab === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                    style={{ backgroundColor: activeTab === 'usuarios' ? '#EC652B' : 'transparent', borderColor: '#EC652B', color: activeTab === 'usuarios' ? '#fff' : '#EC652B' }}
                    onClick={() => setActiveTab('usuarios')}
                >
                    <FaUsers className="me-2" /> Usuarios
                </button>
            </div>

            <section className="content bg-white p-4 rounded shadow-sm">
                {activeTab === 'rutinas' ? <Rutinas /> : <Usuarios />}
            </section>
        </div>
    );
};

export default Dashboard;
