import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const data = await loginUser(formData);
            if (!data.esAdmin) {
                alert('No tienes autorizado acceder a esta página.');
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard');
            }
        } catch (error) {
            setErrorMsg(error.message || 'Usuario no registrado');
            alert(error.message || 'Usuario no registrado');
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', padding: '60px 0' }}>
            <section className="heading text-center mb-5">
                <h5><FaSignInAlt className="me-2" style={{ color: '#EC652B' }}/> Iniciar Sesión</h5>
                <p>Por favor ingresa para acceder al Dashboard de GymBuddy</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit} className="bg-white p-5 rounded shadow-sm border">
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    <div className="form-group mb-4">
                        <label className="fw-bold mb-2">Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder="ejemplo@correo.com" 
                            onChange={onChange} 
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="fw-bold mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder="Tu contraseña" 
                            onChange={onChange} 
                            required
                        />
                    </div>
                    <div className="form-group mt-4 text-center">
                        <button type="submit" className="btn px-5 py-2" style={{ backgroundColor: '#EC652B', color: '#fff', fontSize: '1.1rem' }}>
                            Ingresar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;
