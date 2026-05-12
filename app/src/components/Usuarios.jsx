import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUsers, FaExclamationTriangle } from 'react-icons/fa';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../api';
import Spinner from './Spinner';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUsuario, setCurrentUsuario] = useState(null);
    const [usuarioToDelete, setUsuarioToDelete] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        tipo: 'Alumno',
        esAdmin: false,
        password: ''
    });

    const { nombre, apellido, email, telefono, tipo, esAdmin, password } = formData;

    const fetchUsuarios = async () => {
        setIsLoading(true);
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (esAdmin && !password && (!currentUsuario || !currentUsuario.esAdmin)) {
            alert('Debes ingresar una contraseña para hacer a este usuario administrador.');
            return;
        }

        setIsLoading(true);
        try {
            if (currentUsuario) {
                await updateUsuario(currentUsuario._id, formData);
            } else {
                await createUsuario(formData);
            }
            await fetchUsuarios();
            setShowForm(false);
            setCurrentUsuario(null);
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                tipo: 'Alumno',
                esAdmin: false,
                password: ''
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const onEdit = (usuario) => {
        setCurrentUsuario(usuario);
        setFormData({
            ...usuario,
            password: '' // Ocultamos el password por seguridad; si lo dejan vacío, en el backend no se cambia.
        });
        setShowForm(true);
        setUsuarioToDelete(null);
    };

    const confirmDelete = (usuario) => {
        setUsuarioToDelete(usuario);
        setShowForm(false);
    };

    const onDelete = async () => {
        if (!usuarioToDelete) return;
        setIsLoading(true);
        try {
            await deleteUsuario(usuarioToDelete._id);
            await fetchUsuarios();
            setUsuarioToDelete(null);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const cancelEdit = () => {
        setShowForm(false);
        setCurrentUsuario(null);
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            tipo: 'Alumno',
            esAdmin: false,
            password: ''
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading mb-4 d-flex justify-content-between align-items-center">
                <h5><FaUsers className="me-2" /> Gestión de Usuarios</h5>
                {!showForm && !usuarioToDelete && (
                    <button className="btn" style={{ backgroundColor: '#EC652B', color: '#fff' }} onClick={() => setShowForm(true)}>
                        <FaPlus className="me-1" /> Añadir
                    </button>
                )}
            </section>

            {usuarioToDelete && (
                <section className="form mb-5 p-4 border rounded" style={{ backgroundColor: '#fff3cd', borderColor: '#ffeeba' }}>
                    <h6 className="mb-3 text-danger"><FaExclamationTriangle className="me-2" />Confirmar Eliminación</h6>
                    <p>¿Estás seguro de que deseas eliminar al usuario <strong>{usuarioToDelete.nombre} {usuarioToDelete.apellido}</strong>?</p>
                    <div className="form-group mt-3">
                        <button type="button" className="btn btn-danger me-2" onClick={onDelete}>
                            Sí, Eliminar
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setUsuarioToDelete(null)}>
                            Cancelar
                        </button>
                    </div>
                </section>
            )}

            {showForm && (
                <section className="form mb-5 p-4 border rounded bg-light">
                    <h6 className="mb-3">{currentUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h6>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group mb-3">
                                <label>Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={nombre} onChange={onChange} required />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label>Apellido</label>
                                <input type="text" className="form-control" name="apellido" value={apellido} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Teléfono</label>
                            <input type="text" className="form-control" name="telefono" value={telefono} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Tipo</label>
                            <select className="form-control" name="tipo" value={tipo} onChange={onChange} required>
                                <option value="Alumno">Alumno</option>
                                <option value="Coach">Coach</option>
                                <option value="Egresado">Egresado</option>
                            </select>
                        </div>

                        <div className="form-group mb-3 form-check mt-4">
                            <input type="checkbox" className="form-check-input" id="esAdmin" name="esAdmin" checked={esAdmin} onChange={onChange} />
                            <label className="form-check-label fw-bold" htmlFor="esAdmin">¿Es Administrador?</label>
                        </div>

                        {esAdmin && (
                            <div className="form-group mb-3">
                                <label>Contraseña {currentUsuario ? '(Dejar en blanco para mantener la misma)' : ''}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required={!currentUsuario} // requerido al crear un admin nuevo, pero no al editar
                                />
                            </div>
                        )}

                        <div className="form-group mt-4">
                            <button type="submit" className="btn me-2" style={{ backgroundColor: '#EC652B', color: '#fff' }}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Tipo</th>
                            <th>Admin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario._id}>
                                <td><strong>{usuario.nombre}</strong></td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.telefono}</td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: usuario.tipo === 'Coach' ? '#333' : '#EC652B' }}>
                                        {usuario.tipo}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge" style={{ backgroundColor: usuario.esAdmin ? '#28a745' : '#6c757d' }}>
                                        {usuario.esAdmin ? 'Sí' : 'No'}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-2 mb-1" onClick={() => onEdit(usuario)}><FaEdit /></button>
                                    <button className="btn btn-sm btn-outline-danger mb-1" onClick={() => confirmDelete(usuario)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default Usuarios;
