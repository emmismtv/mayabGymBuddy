import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaDumbbell, FaExclamationTriangle } from 'react-icons/fa';
import { getRutinas, createRutina, updateRutina, deleteRutina } from '../api';
import Spinner from './Spinner';

const Rutinas = () => {
    const [rutinas, setRutinas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentRutina, setCurrentRutina] = useState(null);
    const [rutinaToDelete, setRutinaToDelete] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        grupoMuscular: '',
        nivel: '',
        repeticiones: '',
        series: ''
    });

    const { nombre, descripcion, grupoMuscular, nivel, repeticiones, series } = formData;

    const fetchRutinas = async () => {
        setIsLoading(true);
        try {
            const data = await getRutinas();
            setRutinas(data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRutinas();
    }, []);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (currentRutina) {
                await updateRutina(currentRutina._id, formData);
            } else {
                await createRutina(formData);
            }
            await fetchRutinas();
            setShowForm(false);
            setCurrentRutina(null);
            setFormData({
                nombre: '',
                descripcion: '',
                grupoMuscular: '',
                nivel: '',
                repeticiones: '',
                series: ''
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const onEdit = (rutina) => {
        setCurrentRutina(rutina);
        setFormData(rutina);
        setShowForm(true);
        setRutinaToDelete(null);
    };

    const confirmDelete = (rutina) => {
        setRutinaToDelete(rutina);
        setShowForm(false);
    };

    const onDelete = async () => {
        if (!rutinaToDelete) return;
        setIsLoading(true);
        try {
            await deleteRutina(rutinaToDelete._id);
            await fetchRutinas();
            setRutinaToDelete(null);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const cancelEdit = () => {
        setShowForm(false);
        setCurrentRutina(null);
        setFormData({
            nombre: '',
            descripcion: '',
            grupoMuscular: '',
            nivel: '',
            repeticiones: '',
            series: ''
        });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading mb-4 d-flex justify-content-between align-items-center">
                <h5><FaDumbbell className="me-2" /> Gestión de Rutinas</h5>
                {!showForm && !rutinaToDelete && (
                    <button className="btn" style={{ backgroundColor: '#EC652B', color: '#fff' }} onClick={() => setShowForm(true)}>
                        <FaPlus className="me-1" /> Añadir
                    </button>
                )}
            </section>

            {rutinaToDelete && (
                <section className="form mb-5 p-4 border rounded" style={{ backgroundColor: '#fff3cd', borderColor: '#ffeeba' }}>
                    <h6 className="mb-3 text-danger"><FaExclamationTriangle className="me-2" />Confirmar Eliminación</h6>
                    <p>¿Estás seguro de que deseas eliminar la rutina <strong>{rutinaToDelete.nombre}</strong>?</p>
                    <div className="form-group mt-3">
                        <button type="button" className="btn btn-danger me-2" onClick={onDelete}>
                            Sí, Eliminar
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => setRutinaToDelete(null)}>
                            Cancelar
                        </button>
                    </div>
                </section>
            )}

            {showForm && (
                <section className="form mb-5 p-4 border rounded bg-light">
                    <h6 className="mb-3">{currentRutina ? 'Editar Rutina' : 'Nueva Rutina'}</h6>
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label>Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={nombre} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Descripción</label>
                            <textarea className="form-control" rows="3" name="descripcion" value={descripcion} onChange={onChange} required></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Grupo Muscular</label>
                            <input type="text" className="form-control" name="grupoMuscular" value={grupoMuscular} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>Nivel</label>
                            <input type="text" className="form-control" name="nivel" value={nivel} onChange={onChange} required />
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group mb-3">
                                <label>Repeticiones</label>
                                <input type="text" className="form-control" name="repeticiones" value={repeticiones} onChange={onChange} required />
                            </div>
                            <div className="col-md-6 form-group mb-3">
                                <label>Series</label>
                                <input type="text" className="form-control" name="series" value={series} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-group mt-3">
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
                            <th>Descripción</th>
                            <th>Grupo Muscular</th>
                            <th>Nivel</th>
                            <th>Reps</th>
                            <th>Series</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rutinas.map(rutina => (
                            <tr key={rutina._id}>
                                <td><strong>{rutina.nombre}</strong></td>
                                <td>{rutina.descripcion}</td>
                                <td>{rutina.grupoMuscular}</td>
                                <td>{rutina.nivel}</td>
                                <td>{rutina.repeticiones}</td>
                                <td>{rutina.series}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-2 mb-1" onClick={() => onEdit(rutina)}><FaEdit /></button>
                                    <button className="btn btn-sm btn-outline-danger mb-1" onClick={() => confirmDelete(rutina)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default Rutinas;
