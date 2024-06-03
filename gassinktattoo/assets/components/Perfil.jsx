import React, { useState, useEffect } from 'react';
import Pedidos from './Pedidos';
import '../styles/perfil.css';

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
        <div className="profile-container">
            {cliente && (
                <>
                    <div 
                        className="profile-banner" 
                        style={{ backgroundImage: `url(uploads/images/fotosPerfil/${cliente.image})` }}
                    ></div>
                    <div className="profile-details">
                        <div className="profile-info">
                            <img 
                                src={"uploads/images/fotosPerfil/" + cliente.image} 
                                alt="Imagen de perfil"
                                className="profile-image"
                            />
                            <p>Username: {cliente.username}</p>
                            <p>Email: {cliente.email}</p>
                        </div>
                        <div className="profile-buttons">
                            <button onClick={abrirModal}>Ver Pedidos</button>
                            <button>Favoritos</button>
                            <button>Citas</button>
                        </div>
                    </div>
                </>
            )}
            <Pedidos show={mostrarModal} onHide={cerrarModal} />
        </div>
    );
};

export default Perfil;