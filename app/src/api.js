const API_URL = 'https://mayabgymbuddy-backend.onrender.com/api';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        };
    } else {
        return { 'Content-Type': 'application/json' };
    }
};

export const loginUser = async (credentials) => {
    const res = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Error en el login');
    }
    return data;
};

export const getRutinas = async () => {
    const res = await fetch(`${API_URL}/rutinas`);
    return res.json();
};

export const createRutina = async (rutina) => {
    const res = await fetch(`${API_URL}/rutinas`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(rutina)
    });
    return res.json();
};

export const updateRutina = async (id, rutina) => {
    const res = await fetch(`${API_URL}/rutinas/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(rutina)
    });
    return res.json();
};

export const deleteRutina = async (id) => {
    const res = await fetch(`${API_URL}/rutinas/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return res.json();
};

export const getUsuarios = async () => {
    const res = await fetch(`${API_URL}/usuarios`);
    return res.json();
};

export const createUsuario = async (usuario) => {
    const res = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(usuario)
    });
    return res.json();
};

export const updateUsuario = async (id, usuario) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(usuario)
    });
    return res.json();
};

export const deleteUsuario = async (id) => {
    const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return res.json();
};
