import React, { useState, useEffect } from 'react';
import Pedidos from './Pedidos';

const Perfil = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        fetch('/perfilDatos')
            .then(response => response.json())
            .then(data => setCliente(data))
            .catch(error => console.error('Error al obtener los datos del cliente:', error));
    }, []);

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            {cliente && (
                <div>
                    <p>Username: {cliente.username}</p>
                    <p>Email: {cliente.email}</p>
                    <img src={"uploads/images/fotosPerfil/" + cliente.image} alt="Imagen de perfil" style={{ width: '100px', height: '100px' }} />
                </div>
            )}

            <button onClick={abrirModal}>Ver Pedidos</button>
            <Pedidos show={mostrarModal} onHide={cerrarModal} />
        </div>
    );
};

export default Perfil;